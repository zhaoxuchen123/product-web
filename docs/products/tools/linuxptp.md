<div class="plat-hero">
  <div class="plat-hero-left">
    <div class="plat-breadcrumb"><a href="/products/tools/">网络工具</a> / linuxptp</div>
    <h1 class="plat-title">linuxptp</h1>
    <p class="plat-mfr">南京翼辉网络部 · SylixOS 高精度网络时间同步套件</p>
    <VersionBadge product="tools/linuxptp" />
    <a class="armory-link" href="http://10.7.1.31/acohub/armory/package/nic_drv/linuxptp/4.4.2" target="_blank">Armory 获取</a>
  </div>
  <div class="plat-hero-stats">
    <div class="plat-stat"><span class="ps-val">PTP</span><span class="ps-label">IEEE 1588</span></div>
    <div class="plat-stat"><span class="ps-val">gPTP</span><span class="ps-label">802.1AS</span></div>
    <div class="plat-stat"><span class="ps-val">≤250ns</span><span class="ps-label">硬件时间戳</span></div>
    <div class="plat-stat"><span class="ps-val">SylixOS</span><span class="ps-label">目标平台</span></div>
  </div>
</div>

## 简介

`linuxptp` 是翼辉基于 SylixOS 移植定制的高精度网络时间同步套件，支持普通 PTP（IEEE 1588）与 gPTP（IEEE 802.1AS），适用于工业自动化、车载以太网、TSN、测试测量等需要亚微秒级时间同步的场景。

套件核心工具包括：

| 工具 | 作用 |
|------|------|
| `ptp4l` | 运行 PTP/gPTP 协议栈，完成端口状态机、BMCA、报文收发和 PHC 同步 |
| `phc2sys` | 在 PHC（网卡硬件时钟）与 `CLOCK_REALTIME` 等系统时钟之间做同步 |
| `pmc` | 通过 PTP 管理消息查询或配置 `ptp4l` 的数据集和端口状态 |

## 基础概念

| 概念 | 说明 |
|------|------|
| PTP | Precision Time Protocol，面向分布式系统的精确时间同步协议，常用于工业控制、电信、金融、数据中心等场景 |
| gPTP | generalized PTP，IEEE 802.1AS 定义的时间同步协议，常用于车载以太网、AVB/TSN 音视频和工业 TSN |
| 软件时间戳 | 由内核协议栈记录收发时间，部署简单，但精度容易受系统负载影响 |
| 硬件时间戳 | 由支持 PTP 的网卡/PHY 记录收发时间，精度可达纳秒级，推荐生产场景使用 |
| E2E | End-to-End 延迟机制，适合普通 PTP 和简单网络拓扑 |
| P2P | Peer-to-Peer 延迟机制，支持透明时钟，gPTP 场景通常要求使用 |

## 部署

### 准备条件

- 翼辉高精度网络时间同步方案套件。
- 支持网络时间戳版本的 SylixOS 固件与目标板卡。
- 支持硬件时间戳的网卡或 MAC/PHY 组合（可选，但推荐）。

### 内核补丁

如果目标 BSP 尚未包含网络时间戳支持，需要将套件提供的 SylixOS 内核补丁放到 `libsylixos` 目录，并执行：

```bash
patch -p1 < xxxx.patch
```

### Armory 自动安装

配置目标板卡远程地址后，可通过 Armory 自动下载并部署套件：

```bash
armory remote set default="remote://username:password@board_ip"
armory install @nic_drv/linuxptp
```

也可以按套件目录结构手动上传对应文件到板卡的 `usr`、`etc` 等目录。

## 快速验证 PTP

以下命令不使用配置文件，适合快速验证。正式部署时建议通过 `-f` 指定配置文件。

### 主时钟（Master）

软件时间戳：

```bash
ptp4l -i en1 -m -S
```

硬件时间戳：

```bash
ptp4l -i en1 -m -p /dev/ptp0
```

### 从时钟（Slave）

软件时间戳：

```bash
ptp4l -i en1 -s -m -S
```

硬件时间戳：

```bash
ptp4l -i en1 -s -m -p /dev/ptp0 &
phc2sys -s /dev/ptp0 -c CLOCK_REALTIME -m -w &
```

硬件时间戳模式下，`ptp4l` 负责将网卡 PHC 与主时钟同步；如果还需要同步系统时间，需要同时运行 `phc2sys`。

## 快速验证 gPTP

gPTP 使用二层 Ethernet 报文，强烈建议使用硬件时间戳。以下示例为最常见的 Ordinary Clock 模式。

### 主时钟（Grandmaster）

软件时间戳：

```bash
ptp4l -i en1 -m -S -2
```

硬件时间戳：

```bash
ptp4l -i en1 -2 -m -p /dev/ptp0
```

### 从时钟（Time-Aware Slave）

软件时间戳：

```bash
ptp4l -i en1 -2 -s -m -S
```

硬件时间戳：

```bash
ptp4l -i en1 -2 -s -m -p /dev/ptp0 &
phc2sys -s /dev/ptp0 -c CLOCK_REALTIME -m -w &
```

## 常用参数

| 参数 | 适用工具 | 说明 |
|------|----------|------|
| `-i <ifname>` | `ptp4l` | 指定网卡接口，如 `en1` |
| `-m` | `ptp4l` / `phc2sys` | 将日志打印到终端，便于调试 |
| `-S` | `ptp4l` | 强制使用软件时间戳 |
| `-p <device>` | `ptp4l` | 指定网卡绑定的 PTP 设备，如 `/dev/ptp0` |
| `-s` | `ptp4l` / `phc2sys` | `ptp4l` 中表示 slaveOnly；`phc2sys` 中表示同步源时钟 |
| `-2` | `ptp4l` | 使用 IEEE 802.3 二层传输，gPTP 场景常用 |
| `-f <file>` | `ptp4l` | 指定配置文件 |
| `-c <clock>` | `phc2sys` | 指定同步目标时钟，如 `CLOCK_REALTIME` |
| `-w` | `phc2sys` | 等待 `ptp4l` 完成同步后再开始同步系统时钟 |

## 同步状态判断

`ptp4l` 从时钟日志出现类似内容时，表示端口已进入同步状态：

```text
port 1 (en1): LISTENING to UNCALIBRATED on RS_SLAVE
port 1 (en1): UNCALIBRATED to SLAVE on MASTER_CLOCK_SELECTED
master offset  1300 s2 freq -10464 path delay 151636
```

关键字段说明：

- `SLAVE`：端口已作为从时钟工作。
- `master offset`：从时钟与主时钟的时间偏差，单位通常为纳秒。
- `path delay`：链路路径延迟估计值。
- `s2`：伺服状态进入锁定/稳定阶段。

`phc2sys` 日志出现 `CLOCK_REALTIME phc offset` 持续输出时，表示正在将 PHC 与系统时钟做同步：

```text
phc2sys[949.536]: CLOCK_REALTIME phc offset -272804 s0 freq +0 delay 0
phc2sys[951.536]: CLOCK_REALTIME phc offset  743962 s2 freq +740704 delay 0
```

## 管理与诊断

通过 `pmc` 可以查询 `ptp4l` 的端口属性、延迟机制和运行状态：

```bash
# 查询端口属性
pmc -u -b 0 'GET PORT_PROPERTIES_NP'

# 查询端口数据集和延迟机制
pmc -u -b 0 'GET PORT_DATA_SET_NP'
```

常见排查步骤：

1. 确认网卡名、PTP 设备名是否正确，如 `en1`、`/dev/ptp0`。
2. 确认网卡驱动和内核已启用网络时间戳能力。
3. 普通 PTP 可先用 `-S` 软件时间戳验证链路；gPTP 建议直接验证硬件时间戳。
4. 从时钟未进入 `SLAVE` 时，检查主从是否在同一二层网络、是否选择了正确传输层（UDP 或 L2）。
5. 使用配置文件部署时，确认 delay 机制、domainNumber、transportSpecific、logSyncInterval 等参数与对端一致。

<style>
.plat-hero {
  display: flex; align-items: flex-start; justify-content: space-between;
  flex-wrap: wrap; gap: 1.5rem; padding: 1.5rem; border-radius: 14px;
  border: 1px solid var(--card-border); background: var(--card-bg); margin: 1rem 0 2rem;
}
.plat-breadcrumb { font-size: 0.78rem; color: var(--vp-c-text-3); margin-bottom: 0.5rem; }
.plat-breadcrumb a { color: var(--vp-c-brand-1); text-decoration: none; }
.armory-link { display: inline-block; margin-left: 0.5rem; font-size: 0.68rem; font-weight: 700; padding: 3px 10px; border-radius: 20px; background: rgba(59,130,246,.12); color: var(--vp-c-brand-1); text-decoration: none !important; }
.armory-link:hover { opacity: 0.8; }
.plat-title { font-size: 1.8rem; font-weight: 800; letter-spacing: -0.03em; margin: 0 0 0.25rem; }
.plat-mfr { font-size: 0.85rem; color: var(--vp-c-text-3); margin: 0 0 0.75rem; }
.plat-badge { font-size: 0.68rem; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
.plat-badge.stable { background: rgba(34,197,94,.12); color: #22c55e; }
.plat-hero-stats { display: grid; grid-template-columns: repeat(2,1fr); gap: 0.6rem; }
.plat-stat {
  display: flex; flex-direction: column; align-items: center;
  padding: 0.6rem 1rem; border-radius: 10px;
  background: rgba(59,130,246,.06); border: 1px solid rgba(59,130,246,.1);
}
.ps-val   { font-size: 1rem; font-weight: 800; color: var(--vp-c-brand-1); }
.ps-label { font-size: 0.65rem; color: var(--vp-c-text-3); margin-top: 2px; }
</style>
