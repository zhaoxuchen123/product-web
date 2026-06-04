# ring-suit 选型指南

`ring-suit` 支持 RSTP、ERPS、MRP/MRC 三类环网冗余能力。选型时应先明确现场网络是否已有工业交换机协议、是否需要接入 PROFINET、是否能规划专用控制 VLAN，以及期望由哪个节点控制阻塞点。

## 快速选型表

| 场景 | 推荐协议 | 理由 |
|------|----------|------|
| 通用二层冗余环，现场设备协议能力不统一 | RSTP | 标准兼容性好，可与支持 STP/RSTP 的交换设备协同 |
| 希望明确 RPL 阻塞点，使用专用控制 VLAN | ERPS | 环保护模型清晰，支持 owner / neighbour / normal 角色和 R-APS 控制 |
| PROFINET 网络中已有 MRM 管理环网 | MRP/MRC | SylixOS 设备作为 MRP Client 接入，由外部 MRM 管理环网状态 |
| 只需要简单防环、收敛时间要求不极限 | RSTP | 配置简单，排障成本低 |
| 工业交换机已规划 ERPS 环 | ERPS | 与交换机 ERPS 配置保持一致，便于控制 RPL 和业务 VLAN |
| PLC / IO 设备需要接入 PROFINET MRP 环 | MRP/MRC | 满足 PROFINET MRP Client 接入要求 |

## RSTP 适用场景

RSTP 适合通用二层网络冗余，依赖 bridge 优先级、端口路径开销和 BPDU 计算出无环拓扑。

**建议选择 RSTP 的情况：**

- 网络中已有支持 STP/RSTP 的交换机，且不要求 ERPS / MRP 专有协议。
- 现场拓扑可能不只是单一环，也可能存在链式或混合二层拓扑。
- 希望通过 bridge priority、path cost 等标准参数决定根桥和阻塞口。
- 运维人员熟悉 STP/RSTP 排障方法。

**注意事项：**

- 同一二层域内 bridge 优先级需要统一规划，避免根桥漂移。
- 端口接线变化后应通过 `rstp-ctl status` 查看角色和状态。
- 拓扑变化会触发 FDB 刷新，业务抖动时间与定时器、交换设备实现有关。

## ERPS 适用场景

ERPS 适合专用以太环保护场景，通过 RPL owner / neighbour / normal 角色明确阻塞点，并使用 R-APS 控制报文在控制 VLAN 中传播环状态。

**建议选择 ERPS 的情况：**

- 网络是明确的单环或多环结构，现场可规划 RPL 阻塞链路。
- 交换机和终端设备均支持 ERPS 或可以按 ERPS 角色协同。
- 需要区分控制 VLAN 与受保护业务 VLAN。
- 希望通过 `ms` / `fs` / `fail` / `recover` 命令进行人工切换和故障演练。

**角色选择建议：**

| 角色 | 说明 | 配置重点 |
|------|------|----------|
| `owner` | RPL owner，负责正常状态下阻塞 RPL 端口 | 必须配置 `rpl_port` |
| `neighbour` | RPL neighbour，与 owner 相邻 | 根据拓扑配置相邻 RPL 端口 |
| `normal` | 普通环节点 | 不配置 RPL 控制职责 |

**注意事项：**

- `control_vlan` 需要在环上所有设备可达，不能与普通业务规划冲突。
- `protected_vlan` 表示受保护业务 VLAN，业务流量应在 bridge 中透明转发。
- `revertive=0` 为非回切，恢复后不自动切回；`revertive=1` 会在 WTR 到期后自动回切。

## MRP/MRC 适用场景

MRP/MRC 适合 PROFINET MRP 工业环网。`ring-suit` 中的 `mrc` 作为 MRP Client 接入外部 MRM 管理的环网。

**建议选择 MRP/MRC 的情况：**

- 现场是 PROFINET 网络，并已由工业交换机或控制器作为 MRM 管理环网。
- SylixOS 设备作为 PLC、远程 IO、边缘控制器等 MRC 节点接入。
- 业务要求遵循 PROFINET/MRP 现场规范。

**注意事项：**

- 同一 MRP domain 中通常只应存在一个 MRM。
- MRC 场景下通常不让 MRC 主动竞争数据平面阻塞控制，可保持 `mrp_control_bridge_gate=false`。
- `station_name`、`vendor_id`、`device_id` 等 PROFINET 参数需要与现场工程配置一致。

## 不建议的组合

- 同一物理环上同时运行 RSTP 与 ERPS。
- 同一物理环上同时运行 ERPS 与 MRP。
- MRC 节点主动控制 bridge gate，同时现场 MRM 也在控制阻塞口。
- ERPS 控制 VLAN 与业务 VLAN 未隔离，导致 R-APS 控制帧被错误转发或过滤。

## 选型流程

1. 如果现场是 PROFINET MRP 环，优先选择 MRP/MRC。
2. 如果现场交换机已规划 ERPS，选择 ERPS，并确认 owner / neighbour / normal 角色。
3. 如果现场为通用二层冗余，且设备协议能力不统一，选择 RSTP。
4. 明确端口接线、阻塞点、VLAN 和回切策略。
5. 使用 `ring_conv` 或业务流量测试故障断链、恢复和人工切换效果。
