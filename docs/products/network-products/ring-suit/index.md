# ring-suit · 环网冗余套件

`ring-suit` 是面向 SylixOS 的工业环网冗余协议套件，集成 RSTP、ERPS、MRP/MRC 三类能力，适用于工业交换机、PLC、远程 IO、边缘控制器等多网口工业以太网设备。

它用于构建二层冗余环、ERPS 专用保护环和 PROFINET MRP 环网，解决现场网络中的链路冗余、故障倒换、环路抑制和网络恢复问题。

## Armory 获取

<div class="armory-card">
  <div class="armory-card-title">从 Armory 获取 ring-suit 套件</div>
  <p>先设置目标板卡远端地址，再安装环网冗余套件：</p>

```bash
armory remote set default="remote://username:password@board_ip"
armory install @nic_drv/ring-suit
```

  <p class="armory-card-link">详细内容参考：<a href="http://10.7.1.31/acohub/armory/package/nic_drv/ring-suit/1.0.0" target="_blank" rel="noopener noreferrer">ring-suit Armory 包详情</a></p>
</div>
## 能力概览

| 能力 | 说明 | 典型场景 |
|------|------|----------|
| RSTP | 快速生成树协议，基于 bridge 端口状态控制形成无环拓扑 | 通用二层交换网络、混合交换机场景、对标准兼容性要求高的网络 |
| ERPS | 以太网环保护协议，支持 RPL owner、neighbour、normal 角色和 R-APS 控制报文 | 专用工业以太环、需要明确阻塞点和保护 VLAN 的场景 |
| MRP/MRC | PROFINET MRP Client，接入外部 MRM 管理的 MRP 环 | PROFINET 工业网络、PLC 或 IO 作为 MRC 节点接入 MRP 环 |
| ring bridge | 统一桥端口控制能力，可联动端口阻塞、放开和 FDB 刷新 | 三类协议共用的数据转发基础 |
| ring_conv | 固定频率 UDP 序号流收敛测试工具 | 量化故障倒换期间业务中断窗口 |

::: warning 注意
同一物理环网中 RSTP、ERPS、MRP/MRC 协议互斥，不建议在同一环上同时运行多种环网协议。
:::

## 软件组成

| 组件 | 类型 | 作用 |
|------|------|------|
| `rstp.ko` | 内核模块 | RSTP BPDU 收发、端口角色计算、桥端口状态控制 |
| `rstp-ctl` | 控制工具 | RSTP 初始化、状态查询、拓扑重算和销毁 |
| `erps.ko` | 内核模块 | ERPS R-APS 报文处理、RPL 阻塞、MS/FS、故障恢复 |
| `erps-ctl` | 控制工具 | ERPS 初始化、状态查询、人工/强制切换、故障模拟 |
| `libmrp_service.so` | 动态库 | MRP 状态机、端口检测和报文处理服务 |
| `libpnet.so` | 动态库 | PROFINET 协议栈库，供 MRP/MRC 应用使用 |
| `mrc` | 用户态程序 | MRP Client 进程，用于接入 PROFINET MRP 环网 |
| `ring_conv` | PC 侧工具 | 通过 UDP 序号流统计环网倒换收敛窗口 |

## 默认配置目录

`ring-suit` 默认使用 `/etc/ring/` 保存运行配置：

| 文件 | 作用 |
|------|------|
| `/etc/ring/bridge.conf` | 配置环网 bridge 的 IP、掩码和网关 |
| `/etc/ring/rstp.conf` | 配置 RSTP bridge 参数和端口列表 |
| `/etc/ring/erps.conf` | 配置 ERPS ring、角色、RPL、VLAN 和定时器 |
| `/etc/ring/mrc.conf` | 配置 MRP/MRC 设备信息、端口、策略和 PROFINET 参数 |

配置中的端口名称需要与 SylixOS 系统实际网口一致，例如 `en1`、`en2`。现场调试前建议先确认链路、端口顺序和 bridge 成员关系。

## 文档导航

- [快速开始](./quick-start)：部署补丁、安装套件并启动 RSTP / ERPS / MRP/MRC。
- [配置指南](./configuration)：说明 `bridge.conf`、`rstp.conf`、`erps.conf`、`mrc.conf` 的关键字段和示例。
- [选型指南](./selection)：说明 RSTP、ERPS、MRP/MRC 的适用场景和选型建议。
- [收敛测试](./convergence)：使用 `ring_conv` 量化故障倒换期间的业务中断窗口。
<style>
.armory-card {
  margin: 1rem 0 2rem;
  padding: 1rem 1.1rem;
  border: 1px solid var(--card-border);
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(59,130,246,.08), rgba(34,197,94,.05));
}
.armory-card-title {
  font-size: 1rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin-bottom: 0.4rem;
}
.armory-card p {
  margin: 0.45rem 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}
.armory-card-link a {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
</style>
