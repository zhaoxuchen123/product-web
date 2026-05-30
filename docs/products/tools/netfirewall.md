<script setup>
import ChangelogEntry from '../../.vitepress/theme/components/ChangelogEntry.vue'
</script>

<div class="plat-hero">
  <div class="plat-hero-left">
    <div class="plat-breadcrumb"><a href="/products/tools/">网络工具</a> / netfirewall</div>
    <h1 class="plat-title">netfirewall</h1>
    <p class="plat-mfr">南京翼辉网络部 · SylixOS 网络防火墙与流量控制工具</p>
    <VersionBadge product="tools/netfirewall" />
    <a class="armory-link" href="http://10.7.1.31/acohub/armory/" target="_blank">Armory 获取</a>
  </div>
  <div class="plat-hero-stats">
    <div class="plat-stat"><span class="ps-val">netfw.ko</span><span class="ps-label">内核模块</span></div>
    <div class="plat-stat"><span class="ps-val">netfw_md</span><span class="ps-label">防御应用</span></div>
    <div class="plat-stat"><span class="ps-val">flowctl</span><span class="ps-label">流控策略</span></div>
    <div class="plat-stat"><span class="ps-val">SylixOS</span><span class="ps-label">目标平台</span></div>
  </div>
</div>

## 简介

`netfirewall` 由防火墙内核框架和配套防御应用组成，用于在 SylixOS 系统中提供网络流量监控、过滤、限速和风暴防御能力。

- `netfw.ko`：防火墙内核模块，提供 `/dev/netfw` 控制接口和网卡收包路径挂接能力。
- `netfw_md`：防御应用程序，负责读取配置、注册防护策略并启动指定网卡防护。
- `flowctl.json`：`netfw_md` 默认使用的 JSON 配置文件，用于描述网卡、限速规则、匹配条件和中断控制参数。

整体运行关系：

```text
加载 netfw.ko
  ↓
创建防火墙内核框架和 /dev/netfw 控制接口
  ↓
启动 netfw_md
  ↓
读取 /etc/flowctl.json
  ↓
向 netfw.ko 注册 flowctl 防御策略
  ↓
指定网卡收包时按规则放行或丢弃报文
```

## 功能特性

### 防火墙框架

- 提供 SylixOS 网络防火墙内核模块。
- 支持应用程序注册防护回调。
- 支持对指定网卡启用或停止防护。
- 支持基础报文分类和过滤管理。
- 支持可选的网卡接收中断速率控制。

### 流量控制

- 基于令牌桶算法进行流量限速。
- 支持按报文个数限速。
- 支持按带宽/字节速率限速。
- 支持同时启用报文个数令牌桶和带宽令牌桶。
- 支持短时间突发流量控制。
- 支持多个网卡和多个过滤器规则。

### 匹配能力

`netfw_md` 支持多维度流量匹配：

- MAC 地址匹配。
- IPv4 地址匹配。
- 端口匹配。
- 源/目的地址范围匹配。
- 源/目的端口范围匹配。
- MAC、IPv4、端口组合匹配。
- `AND`、`OR`、`ALL` 等匹配模式。

### 风暴防御状态

风暴防御运行状态会写入：

```text
/tmp/netfw_storm_status
```

文件格式示例：

```text
1
eth0=1
eth1=0
```

- 第 1 行：全局状态，`1` 表示至少一个启用网口处于风暴状态，`0` 表示都不在风暴状态。
- 后续每行：`网口名=状态`，表示对应网口是否处于风暴状态。

## 系统要求

- SylixOS 实时操作系统。
- 目标系统支持加载内核模块。
- 目标网卡驱动可被防火墙框架挂接。
- 如需接收中断速率控制，网卡驱动需要额外适配 `NETFW_DRV_CMD_CTRL`。

## 安装部署

通常需要部署以下文件：

```text
netfw.ko
netfw_md
flowctl.json
```

推荐部署路径：

```bash
cp netfw.ko /lib/modules/
cp netfw_md /usr/sbin/
cp flowctl.json /etc/
chmod +x /usr/sbin/netfw_md
```

如果现场系统使用其他目录，可以按实际部署规范调整。

## 使用方法

### 基本启动

先加载防火墙内核模块：

```bash
insmod /lib/modules/netfw.ko
```

再启动 `netfw_md`：

```bash
netfw_md
```

默认配置文件路径为：

```text
/etc/flowctl.json
```

指定配置文件启动：

```bash
netfw_md /path/to/flowctl.json
```

或使用参数指定：

```bash
netfw_md -f /path/to/flowctl.json -l debug
```

启用详细日志：

```bash
netfw_md -vv
```

`netfw_md` 启动后会自动转入后台运行，不会长期占用当前终端。

### 命令行参数

| 参数 | 说明 |
|------|------|
| `-f <config_file>` | 指定配置文件路径，默认 `/etc/flowctl.json` |
| `-l <level>` | 设置日志级别 |
| `-v` | 启用详细日志，显示文件和函数信息 |
| `-vv` | 启用完整详细日志，显示所有信息 |
| `-h` | 显示帮助信息 |

日志级别：

| 参数值 | 含义 |
|------|------|
| `none` / `0` | 无日志 |
| `error` / `1` | 错误日志 |
| `warning` / `warn` / `2` | 警告日志 |
| `info` / `3` | 信息日志，默认级别 |
| `debug` / `4` | 调试日志 |

### 停止服务

由于程序会后台运行，可通过信号停止：

```bash
ps aux | grep netfw_md
killall netfw_md
```

或：

```bash
kill <pid>
```

如需卸载内核模块，应先停止 `netfw_md`，再卸载 `netfw.ko`。

## `flowctl.json` 配置

### 配置结构

`flowctl.json` 顶层使用 `rules` 数组，每个 rule 对应一个网卡的流控配置。

```json
{
  "rules": [
    {
      "dev_name": "dw_0",
      "enable": 1,
      "irq_ctrl_enable": 0,
      "high_drop_ratio": 0.05,
      "medium_drop_ratio": 0.02,
      "low_drop_ratio": 0.005,
      "sample_window_ns": 1000000000,
      "irq_interval_ns": 500000000,
      "filters": [
        {
          "pkt_rate": "1Kpps",
          "burst_pkt_rate": "100 packets",
          "rate": "100Mbps",
          "burst": "10Mb",
          "match_rule": "ALL"
        }
      ]
    }
  ]
}
```

### Rule 级配置

| 字段 | 是否必需 | 说明 |
|------|----------|------|
| `dev_name` | 必需 | 网卡设备名称，必须与系统实际网络设备名称匹配，例如 `dw_0` |
| `enable` | 必需 | 是否启用该规则，`1` 启用，`0` 禁用 |
| `irq_ctrl_enable` | 可选 | 是否启用中断控制，`1` 启用，`0` 禁用 |
| `high_drop_ratio` | 可选 | 高丢包率阈值 |
| `medium_drop_ratio` | 可选 | 中丢包率阈值 |
| `low_drop_ratio` | 可选 | 低丢包率阈值 |
| `sample_window_ns` | 可选 | 采样窗口，单位 ns |
| `irq_interval_ns` | 可选 | 中断调整最小间隔，单位 ns |
| `filters` | 必需 | 过滤器数组，每个过滤器描述一条流控规则 |

中断控制相关配置作用于整个 rule，应放在 rule 级别配置。

### Filter 级配置

每个过滤器必须至少指定以下两类令牌桶之一：

- `pkt_rate`：按报文个数限速。
- `rate`：按带宽/字节速率限速。

也可以同时指定两者。此时数据包必须同时满足两个令牌桶条件才能通过，任意一个令牌桶不足都会导致丢包。

| 字段 | 是否必需 | 说明 |
|------|----------|------|
| `pkt_rate` | 可选 | 报文速率，例如 `1Kpps`、`5Mpps` 或数字 |
| `burst_pkt_rate` | 可选 | 报文突发量，例如 `100 packets`、`1.5K packets` |
| `rate` | 可选 | 带宽速率，例如 `100Mbps`、`1Gbps`、`5MBps` |
| `burst` | 可选 | 带宽突发量，例如 `10Mb`、`10MB`、`100KB` |
| `match_rule` | 可选 | 匹配组合方式，支持 `AND`、`OR`、`ALL` |
| `mac` | 可选 | MAC 地址匹配条件 |
| `ipv4` | 可选 | IPv4 地址匹配条件 |
| `port` | 可选 | 端口匹配条件 |

### 速率单位

`pkt_rate` 示例：

```json
"pkt_rate": "1Kpps"
"pkt_rate": "5Mpps"
"pkt_rate": 1000
```

`burst_pkt_rate` 示例：

```json
"burst_pkt_rate": "100 packets"
"burst_pkt_rate": "1.5K packets"
"burst_pkt_rate": 1000
```

`rate` 和 `burst` 支持比特和字节单位，注意区分 `b` 和 `B`：

- `bps` 表示 bit/s。
- `Bps` 表示 Byte/s。
- `Mb` 表示 Megabits。
- `MB` 表示 Megabytes。

### 匹配规则

| 值 | 说明 |
|------|------|
| `AND` | 多个匹配条件同时满足才匹配 |
| `OR` | 多个匹配条件任意一个满足即匹配 |
| `ALL` | 匹配所有报文 |

如果未指定 `match_rule` 且存在多个匹配条件，默认使用 `AND` 逻辑。

## 配置示例

### 基于带宽的简单限速

```json
{
  "rules": [
    {
      "dev_name": "dw_0",
      "enable": 1,
      "filters": [
        {
          "rate": "100Mbps",
          "burst": "50Kb",
          "match_rule": "ALL"
        }
      ]
    }
  ]
}
```

### 基于报文个数的简单限速

```json
{
  "rules": [
    {
      "dev_name": "dw_0",
      "enable": 1,
      "filters": [
        {
          "pkt_rate": "1Kpps",
          "burst_pkt_rate": "100 packets",
          "match_rule": "ALL"
        }
      ]
    }
  ]
}
```

### 同时使用两个令牌桶

```json
{
  "rules": [
    {
      "dev_name": "dw_0",
      "enable": 1,
      "filters": [
        {
          "pkt_rate": "1Kpps",
          "burst_pkt_rate": "100 packets",
          "rate": "100Mbps",
          "burst": "10Mb",
          "match_rule": "AND"
        }
      ]
    }
  ]
}
```

## 工作原理

### 令牌桶算法

流量控制采用令牌桶算法：

1. 系统按配置速率持续生成令牌。
2. 数据包通过时消耗令牌。
3. 如果令牌足够，报文放行。
4. 如果令牌不足，报文丢弃。
5. `burst_pkt_rate` 或 `burst` 决定允许的短时突发量。

### 匹配流程

```text
报文到达
  ↓
按 filters 顺序检查匹配条件
  ↓
根据 match_rule 判断是否匹配
  ↓
匹配成功后应用令牌桶限速
  ↓
令牌足够则放行，不足则丢弃
```

### 中断控制机制

当启用 `irq_ctrl_enable` 时，系统会在采样窗口内统计丢包率，并根据阈值触发不同等级的 RX IRQ 控制请求，用于优化高流量场景下的系统性能。

## 驱动控制

`netfirewall` 还提供更深层次的网卡驱动控制能力，例如网卡接收中断速率控制。

要支持该能力，需要对网卡驱动进行定制。

### 驱动适配要求

1. 在网卡驱动中引入头文件：

```c
#include "netfw_common.h"
#include "netfw_drv_common.h"
```

2. 在网卡驱动的 `ioctl` 实现函数中处理 `NETFW_DRV_CMD_CTRL`。

### 驱动控制伪代码

```c
static int mac_ioctl(struct netdev *dev, int cmd, void *arg)
{
    int                   ret  = 0;
    struct ifreq         *rq   = (struct ifreq *)arg;
    struct netfw_drv_ctl *netfw_drv_ctrl = NULL;

    ...

    switch(cmd) {
        ...

        case NETFW_DRV_CMD_CTRL:
            netfw_drv_ctrl = (struct netfw_drv_ctl *)rq->ifr_data;

            ...

            switch (*(int *)(netfw_drv_ctrl->in)) {
            case NETFW_RX_IRQ_CTRL_SLOW:
                /* set driver rx irq level to slow */
                ...
                break;
            case NETFW_RX_IRQ_CTRL_MEDIUM:
                /* set driver rx irq level to medium */
                ...
                break;
            case NETFW_RX_IRQ_CTRL_FAST:
                /* set driver rx irq level to fast */
                ...
                break;
            case NETFW_RX_IRQ_CTRL_DEFAULT:
                /* set driver rx irq level to default */
                ...
                break;
            default:
                ret = -EINVAL;
                break;
            }
            break;
        default:
            break;
    }

    ...
    return ret;
}
```

如果网卡驱动没有实现该控制接口，基础流控和丢包功能仍可工作，但 RX IRQ 速率控制不会生效。

## 注意事项

1. `netfw.ko` 必须先于 `netfw_md` 加载。
2. `dev_name` 必须与实际网络设备名称匹配。
3. 配置文件必须是合法 JSON 格式。
4. 每个过滤器必须至少指定 `pkt_rate` 或 `rate` 其中之一。
5. 同时指定 `pkt_rate` 和 `rate` 时，两个令牌桶都满足才放行。
6. 注意 `bps` 和 `Bps`、`Mb` 和 `MB` 的区别。
7. 复杂匹配规则可能影响性能，建议按实际场景合理配置。
8. 程序启动后自动转入后台运行。
9. 修改配置后需要重启 `netfw_md` 才会重新加载配置。

## 最新更新

<ChangelogEntry version="1.1.0" date="2026-05-22" type="minor">

- 新增 `netfw_md` 流量控制工具说明
- 新增 `flowctl.json` JSON 配置说明
- 支持基于令牌桶的包速率和带宽限速
- 支持 MAC、IPv4、端口等多维度匹配
- 补充风暴防御状态文件和后台运行说明

</ChangelogEntry>

<ChangelogEntry version="1.0.0" date="2025-10-28" type="minor">

- 初始版本发布
- 提供 SylixOS 网络防火墙框架
- 新增 `/dev/netfw` 控制接口与驱动控制扩展
- 新增 `CLASSIFY_NONE_LEVEL` 分类级别

</ChangelogEntry>

<style>
.plat-hero {
  display: flex; align-items: flex-start; justify-content: space-between;
  flex-wrap: wrap; gap: 1.5rem; padding: 1.5rem; border-radius: 14px;
  border: 1px solid var(--card-border); background: var(--card-bg); margin: 1rem 0 2rem;
}
.plat-breadcrumb { font-size: 0.78rem; color: var(--vp-c-text-3); margin-bottom: 0.5rem; }
.plat-breadcrumb a { color: var(--vp-c-brand-1); text-decoration: none; }
.plat-title { font-size: 1.8rem; font-weight: 800; letter-spacing: -0.03em; margin: 0 0 0.25rem; }
.plat-mfr { font-size: 0.85rem; color: var(--vp-c-text-3); margin: 0 0 0.75rem; }
.plat-badge { font-size: 0.68rem; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
.plat-badge.stable { background: rgba(34,197,94,.12); color: #22c55e; }
.armory-link { display: inline-block; margin-left: 0.5rem; font-size: 0.68rem; font-weight: 700; padding: 3px 10px; border-radius: 20px; background: rgba(59,130,246,.12); color: var(--vp-c-brand-1); text-decoration: none !important; }
.armory-link:hover { opacity: 0.8; }
.plat-hero-stats { display: grid; grid-template-columns: repeat(2,1fr); gap: 0.6rem; }
.plat-stat {
  display: flex; flex-direction: column; align-items: center;
  padding: 0.6rem 1rem; border-radius: 10px;
  background: rgba(59,130,246,.06); border: 1px solid rgba(59,130,246,.1);
}
.ps-val   { font-size: 1rem; font-weight: 800; color: var(--vp-c-brand-1); }
.ps-label { font-size: 0.65rem; color: var(--vp-c-text-3); margin-top: 2px; }
</style>
