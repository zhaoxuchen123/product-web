# ring-suit 配置指南

`ring-suit` 以配置文件驱动运行。三类环网协议均依赖公共 bridge 配置，并分别使用自己的协议配置文件。

## 配置文件关系

| 配置文件 | 默认路径 | 使用者 | 作用 |
|----------|----------|--------|------|
| `bridge.conf` | `/etc/ring/bridge.conf` | RSTP / ERPS / MRP/MRC | 配置环网 bridge 的 IP、掩码和网关 |
| `rstp.conf` | `/etc/ring/rstp.conf` | RSTP | 配置 RSTP bridge 参数、协议版本、定时器和端口 |
| `erps.conf` | `/etc/ring/erps.conf` | ERPS | 配置 ring ID、节点角色、RPL、R-APS VLAN 和定时器 |
| `mrc.conf` | `/etc/ring/mrc.conf` | MRP/MRC | 配置 MRP Client、PROFINET 信息、MRP 端口和现场策略 |

::: tip 配置原则
端口名称必须与系统实际网口名称一致；配置前先确认 `en1` / `en2` 接线顺序，避免协议端口与现场环网方向相反。
:::

## bridge.conf

环网 bridge 由环网程序自动创建，IP 参数从 `bridge.conf` 读取。

| 字段 | 说明 |
|------|------|
| `bridge_ip` | bridge 接口 IPv4 地址 |
| `bridge_netmask` | bridge 接口掩码 |
| `bridge_gateway` | 默认网关，不需要网关时可设为 `0.0.0.0` |

示例：

```ini
bridge_ip=192.168.200.152
bridge_netmask=255.255.255.0
bridge_gateway=0.0.0.0
```

## rstp.conf

RSTP 用于创建 RSTP bridge 实例，并将配置中的端口加入协议计算。

| 字段 | 说明 |
|------|------|
| `bridge_index` | RSTP bridge 实例编号，必须非 0，内核中会生成类似 `rstp1` 的实例名 |
| `bridge_priority` | bridge 优先级，值越小越容易成为根桥 |
| `force_version` | 协议版本，`2` 表示 RSTP，`0` 表示兼容 STP |
| `hello_time` | Hello 定时器，单位秒 |
| `max_age` | BPDU 最大老化时间，单位秒 |
| `forward_delay` | Listening / Learning 等状态延迟，单位秒 |
| `tx_hold_count` | 单周期 BPDU 发送限制 |
| `ageing_time` | MAC / FDB 老化时间，拓扑变化后影响旧表项清理速度 |
| `port_admin_enable` | 默认端口管理使能，`1` 表示参与 RSTP |
| `port_admin_edge` / `port_auto_edge` | 边缘端口相关配置 |
| `port_admin_p2p` | 点到点链路配置，常用 `2` 表示自动 |
| `port_priority` | 端口优先级 |
| `port_path_cost` | 端口路径开销，`0` 表示自动 |
| `port0` / `port1` | 参与 RSTP 的两个环网端口 |

示例：

```ini
bridge_index=1
bridge_priority=0
force_version=2
hello_time=2
max_age=6
forward_delay=4
tx_hold_count=6
ageing_time=20
port_admin_enable=1
port_admin_edge=0
port_auto_edge=0
port_admin_p2p=2
port_priority=128
port_path_cost=0
port0=en1
port1=en2
```

## erps.conf

ERPS 用于创建以太网环保护实例，配置环端口、节点角色、RPL 端口和协议定时器。

| 字段 | 说明 |
|------|------|
| `ring_id` | ERPS ring 实例编号，范围 `0~255` |
| `level` | R-APS 报文优先级/等级，源码限制 `0~7` |
| `role` | 本节点角色：`normal`、`owner`、`neighbour` |
| `node_id` | 本节点标识，建议按设备唯一 MAC 或规划值填写 |
| `port0` / `port1` | ERPS ring 的两个物理端口 |
| `control_vlan` | R-APS 控制 VLAN，ERPS hook 在该 VLAN 上收发/消费控制帧 |
| `protected_vlan` | 受保护/业务 VLAN，业务流量在 bridge 上透明转发 |
| `timer_interval_ms` | ERPS 内部定时器 tick，单位毫秒 |
| `guard_time_ms` | Guard 定时器，状态变化后用于忽略旧 R-APS 信息 |
| `wtr_time_ms` | Wait-To-Restore 定时器，回切模式下链路恢复后等待该时间再回切 |
| `hold_time_ms` | Hold 定时器，通常保持默认 |
| `revertive` | 回切模式，`0` 非回切，`1` 回切 |
| `rpl_port` | RPL 端口，`owner` / `neighbour` 角色必填，必须等于 `port0` 或 `port1` |

示例：

```ini
ring_id=1
level=7
role=owner
node_id=00:00:00:00:00:13
port0=en1
port1=en2
control_vlan=4093
protected_vlan=100
timer_interval_ms=20
guard_time_ms=20
wtr_time_ms=60000
hold_time_ms=0
revertive=0
rpl_port=en2
```

## mrc.conf

MRC 用于将设备作为 MRP Client 接入由外部 MRM 管理的 PROFINET MRP 环网。

| 字段 | 说明 |
|------|------|
| `main_if_name` | 主接口名称，可留空由程序按 bridge/端口配置处理 |
| `bridge_if_name` | bridge 接口名称，例如 `bridge0` |
| `port1_if_name` / `port2_if_name` | MRP 环端口 1/2 的系统网口名 |
| `station_name` | PROFINET 站名 |
| `product_name` | 产品名称 |
| `file_directory` | PROFINET / MRP 运行文件目录 |
| `pnio_persistent_ip` | 是否允许 PNIO 持久化 DCP IP 覆盖 `bridge.conf` |
| `vendor_id_*` / `device_id_*` | PROFINET 设备标识 |
| `mrp_ring_id` / `mrp_domain_id` | MRP ring / domain 参数 |
| `vlan` | VLAN 配置，`0` 表示不由 MRC 配置 bridge VLAN |
| `mrp_domain_uuid` | MRP domain UUID |
| `mrp_check_period_ms` | MRP 检测周期 |
| `mrp_manager_state_hold_ms` | 管理状态保持时间 |
| `mrp_fault_threshold` / `mrp_recover_threshold` | 故障与恢复阈值 |
| `mrp_forward_ptp` | 是否转发 PTP 相关流量 |
| `mrp_control_bridge_gate` | MRC 是否控制 bridge gate；外部 MRM 场景通常关闭 |

示例：

```ini
main_if_name=
bridge_if_name=bridge0
port1_if_name=en1
port2_if_name=en2
station_name=plc-mrc-01
product_name=PLC MRC Runtime
file_directory=/mnt/pnet
pnio_persistent_ip=false
vendor_id_hi=0x12
vendor_id_lo=0x34
device_id_hi=0x56
device_id_lo=0x78
mrp_ring_id=1
mrp_domain_id=0
vlan=0
mrp_domain_uuid=ff:ff:ff:ff:ff:ff:ff:ff:ff:ff:ff:ff:ff:ff:ff:ff
mrp_check_period_ms=200
mrp_manager_state_hold_ms=1000
mrp_fault_threshold=10
mrp_recover_threshold=2
mrp_max_sequence_gap=64
mrp_forward_ptp=false
mrp_send_intest_on_test=false
mrp_intest_reply_on_rx_port=true
mrp_control_plane_test_forward=false
mrp_strict_domain_check=false
mrp_strict_ring_check=true
mrp_strict_sequence_check=false
mrp_control_bridge_gate=false
mrp_closed_block_port=0
mrp_startup_block_port=0
```

## 配置检查清单

- `bridge_ip` 与现场管理网段一致，且不与其他设备冲突。
- `port0` / `port1` 或 `port1_if_name` / `port2_if_name` 与实际接线一致。
- ERPS 的 `control_vlan` 与业务 VLAN 分离，且交换机侧允许该 VLAN 通过。
- ERPS 的 `rpl_port` 只在 `owner` / `neighbour` 节点配置，且必须是环端口之一。
- MRP/MRC 场景中确认网络内只有一个 MRM，MRC 不与 MRM 抢占阻塞控制。
- 切换协议前先停止当前协议实例，避免同一环网中多协议同时控制端口状态。
