# ifethtool 命令参考

`ifethtool` 兼容 Linux `ethtool` 的主要命令，通过 `SIOCETHTOOL` ioctl 与内核兼容层通信。

## 支持范围

| 命令 | Linux 对应 | 说明 |
|------|-----------|------|
| `ifethtool IFNAME` | `ethtool DEVNAME` | 查询链路设置 |
| `-h`, `--help` | `-h` | 显示帮助 |
| `-V`, `--version` | `--version` | 显示版本 |
| `-i`, `--driver` | `-i` | 查询驱动信息 |
| `-a`, `--show-pause` | `-a` | 查询 Pause 参数 |
| `-A`, `--pause` | `-A` | 设置 Pause 参数 |
| `-k`, `--show-features` | `-k` | 查询 feature/offload |
| `-K`, `--features` | `-K` | 设置 feature/offload |
| `-g`, `--show-ring` | `-g` | 查询 ring 参数 |
| `-G`, `--set-ring` | `-G` | 设置 ring 参数 |
| `-c`, `--show-coalesce` | `-c` | 查询中断合并参数 |
| `-C`, `--coalesce` | `-C` | 设置中断合并参数 |
| `-l`, `--show-channels` | `-l` | 查询 channel 参数 |
| `-L`, `--set-channels` | `-L` | 设置 channel 参数 |
| `-S`, `--statistics` | `-S` | 查询驱动统计 |
| `-r`, `--negotiate` | `-r` | 重新触发自动协商 |
| `-s`, `--change` | `-s` | 设置链路参数 |

## 基本链路查询

```bash
ifethtool IFNAME
```

查询链路基础信息，输出字段：`Speed`、`Duplex`、`Auto-negotiation`、`Supported link modes`、`Advertised link modes`、`Link detected`。

对应 ioctl：`ETHTOOL_GSET`、`ETHTOOL_GLINK`

## 驱动信息 `-i`

```bash
ifethtool -i IFNAME
```

| 字段 | 含义 |
|------|------|
| `driver` | 驱动短名 |
| `version` | 驱动版本 |
| `firmware-version` | 固件版本（无则显示 `N/A`）|
| `bus-info` | 总线标识（无则显示 `N/A`）|

对应 ioctl：`ETHTOOL_GDRVINFO` → `ethtool_ops->get_drvinfo`

## 链路参数设置 `-s`

```bash
ifethtool -s IFNAME [speed N] [duplex half|full] [autoneg on|off]
```

| 参数 | 取值 |
|------|------|
| `speed` | `10/100/1000/2500/10000/25000/40000/100000` 等 |
| `duplex` | `half` / `full` |
| `autoneg` | `on` / `off` |

流程：先 `ETHTOOL_GSET` 读出当前配置，覆盖传入参数后用 `ETHTOOL_SSET` 下发。

## Pause 参数 `-a` / `-A`

```bash
ifethtool -a IFNAME               # 查询
ifethtool -A IFNAME [autoneg on|off] [rx on|off] [tx on|off]  # 设置
```

对应 ioctl：`ETHTOOL_GPAUSEPARAM` / `ETHTOOL_SPAUSEPARAM`

## Feature / Offload `-k` / `-K`

```bash
ifethtool -k IFNAME               # 查询所有 feature
ifethtool -K IFNAME FEATURE on|off  # 设置某个 feature
```

常见 feature：

| 名称 | 含义 |
|------|------|
| `rx-checksum` | RX 校验和卸载 |
| `tx-checksum-ipv4` | IPv4 TX 校验和卸载 |
| `tx-tcp-segmentation` | TSO |
| `tx-generic-segmentation` | GSO |
| `rx-gro` | GRO |
| `rx-vlan-hw-parse` | VLAN RX 解析 |
| `tx-vlan-hw-insert` | VLAN TX 插入 |
| `rx-hashing` | RX Hash |

## Ring 深度 `-g` / `-G`

```bash
ifethtool -g IFNAME
ifethtool -G IFNAME [rx N] [tx N]
```

对应 ioctl：`ETHTOOL_GRINGPARAM` / `ETHTOOL_SRINGPARAM` → `ethtool_ops->get_ringparam` / `set_ringparam`

## 中断合并 `-c` / `-C`

```bash
ifethtool -c IFNAME
ifethtool -C IFNAME [rx-usecs N] [tx-usecs N] [rx-frames N] [tx-frames N]
```

对应 ioctl：`ETHTOOL_GCOALESCE` / `ETHTOOL_SCOALESCE` → `ethtool_ops->get_coalesce` / `set_coalesce`

## Channel 数 `-l` / `-L`

```bash
ifethtool -l IFNAME
ifethtool -L IFNAME [combined N]
```

对应 ioctl：`ETHTOOL_GCHANNELS` / `ETHTOOL_SCHANNELS` → `ethtool_ops->get_channels` / `set_channels`

## 驱动统计 `-S`

```bash
ifethtool -S IFNAME
```

对应 ioctl：`ETHTOOL_GSSET_INFO`、`ETHTOOL_GSTRINGS`、`ETHTOOL_GSTATS` → `ethtool_ops->get_ethtool_stats`

## 自动协商 `-r`

```bash
ifethtool -r IFNAME
```

重新触发自动协商。对应 ioctl：`ETHTOOL_NWAY_RST` → `ethtool_ops->nway_reset`
