# ifethtool 应用指南

本文面向需要直接调用 `ioctl(SIOCETHTOOL, ...)` 的 SylixOS 应用开发者。

## 开发前提

```c
#include <net/if_ethtool.h>
#include <sys/ioctl.h>
#include <sys/socket.h>
#include <net/if.h>
```

公共辅助函数：

```c
static int ifethtool_ioctl_call(int sock, const char *ifname, void *edata)
{
    struct ifreq ifr;
    memset(&ifr, 0, sizeof(ifr));
    strncpy(ifr.ifr_name, ifname, IFNAMSIZ - 1);
    ifr.ifr_data = edata;
    return ioctl(sock, SIOCETHTOOL, &ifr);
}
```

## 查询链路设置

对应命令：`ifethtool IFNAME`

```c
struct ethtool_cmd ecmd;
struct ethtool_value eval;

memset(&ecmd, 0, sizeof(ecmd));
ecmd.cmd = ETHTOOL_GSET;
ifethtool_ioctl_call(sock, ifname, &ecmd);

memset(&eval, 0, sizeof(eval));
eval.cmd = ETHTOOL_GLINK;
ifethtool_ioctl_call(sock, ifname, &eval);

printf(\"speed=%uMb/s duplex=%u autoneg=%u link=%u\
\",
       ethtool_cmd_speed(&ecmd), ecmd.duplex, ecmd.autoneg, eval.data);
```

## 查询驱动信息

对应命令：`ifethtool -i IFNAME`

```c
struct ethtool_drvinfo info;
memset(&info, 0, sizeof(info));
info.cmd = ETHTOOL_GDRVINFO;
ifethtool_ioctl_call(sock, ifname, &info);
printf(\"driver=%s version=%s\
\", info.driver, info.version);
```

## 查询/设置 Pause

对应命令：`ifethtool -a/-A IFNAME`

```c
/* 查询 */
struct ethtool_pauseparam pp;
memset(&pp, 0, sizeof(pp));
pp.cmd = ETHTOOL_GPAUSEPARAM;
ifethtool_ioctl_call(sock, ifname, &pp);

/* 设置 */
pp.cmd = ETHTOOL_SPAUSEPARAM;
pp.rx_pause = 1;
pp.tx_pause = 1;
ifethtool_ioctl_call(sock, ifname, &pp);
```

## 查询/设置 Ring 深度

对应命令：`ifethtool -g/-G IFNAME`

```c
struct ethtool_ringparam rp;
memset(&rp, 0, sizeof(rp));
rp.cmd = ETHTOOL_GRINGPARAM;
ifethtool_ioctl_call(sock, ifname, &rp);

/* 设置 RX ring 深度 */
rp.cmd = ETHTOOL_SRINGPARAM;
rp.rx_pending = 512;
ifethtool_ioctl_call(sock, ifname, &rp);
```

## 查询/设置中断合并

对应命令：`ifethtool -c/-C IFNAME`

```c
struct ethtool_coalesce ec;
memset(&ec, 0, sizeof(ec));
ec.cmd = ETHTOOL_GCOALESCE;
ifethtool_ioctl_call(sock, ifname, &ec);

/* 设置 */
ec.cmd = ETHTOOL_SCOALESCE;
ec.rx_coalesce_usecs = 50;
ifethtool_ioctl_call(sock, ifname, &ec);
```

## 查询/设置 Channel 数

对应命令：`ifethtool -l/-L IFNAME`

```c
struct ethtool_channels ch;
memset(&ch, 0, sizeof(ch));
ch.cmd = ETHTOOL_GCHANNELS;
ifethtool_ioctl_call(sock, ifname, &ch);

ch.cmd = ETHTOOL_SCHANNELS;
ch.combined_count = 4;
ifethtool_ioctl_call(sock, ifname, &ch);
```

## 查询/设置 MAC 地址

对应命令：`ifethtool -m/-M IFNAME`

```c
struct ethtool_macaddr emac;
memset(&emac, 0, sizeof(emac));
emac.cmd = ETHTOOL_GMACADDR;
ifethtool_ioctl_call(sock, ifname, &emac);

emac.cmd = ETHTOOL_SMACADDR;
memcpy(emac.addr, mac, 6);
ifethtool_ioctl_call(sock, ifname, &emac);
```

## 查询/设置 MTU

对应命令：`ifethtool -t/-T IFNAME`

```c
struct ethtool_value eval;
memset(&eval, 0, sizeof(eval));
eval.cmd = ETHTOOL_GMTU;
ifethtool_ioctl_call(sock, ifname, &eval);

eval.cmd = ETHTOOL_SMTU;
eval.data = 1500;
ifethtool_ioctl_call(sock, ifname, &eval);
```

## 查询/设置混杂模式

对应命令：`ifethtool -p/-P IFNAME`

```c
struct ethtool_value eval;
memset(&eval, 0, sizeof(eval));
eval.cmd = ETHTOOL_GPROMISC;
ifethtool_ioctl_call(sock, ifname, &eval);

eval.cmd = ETHTOOL_SPROMISC;
eval.data = 1;
ifethtool_ioctl_call(sock, ifname, &eval);
```

## 查询/设置轻量挂起

对应命令：`ifethtool -u/-U IFNAME`

```c
struct ethtool_value eval;
memset(&eval, 0, sizeof(eval));
eval.cmd = ETHTOOL_GLIGHTSUSPEND;
ifethtool_ioctl_call(sock, ifname, &eval);

eval.cmd = ETHTOOL_SLIGHTSUSPEND;
eval.data = 1;
ifethtool_ioctl_call(sock, ifname, &eval);
```

## 查询驱动统计

对应命令：`ifethtool -S IFNAME`

采用两次查询：先获取统计项数量，再按数量分配内存读取值。

```c
/* 1. 获取统计项数量 */
struct ethtool_sset_info ssi;
memset(&ssi, 0, sizeof(ssi));
ssi.cmd = ETHTOOL_GSSET_INFO;
ssi.sset_mask = (1ULL << ETH_SS_STATS);
ifethtool_ioctl_call(sock, ifname, &ssi);
uint32_t n_stats = ssi.data[0];

/* 2. 获取名称 */
struct ethtool_gstrings *gs = calloc(1, sizeof(*gs) + n_stats * ETH_GSTRING_LEN);
gs->cmd = ETHTOOL_GSTRINGS;
gs->string_set = ETH_SS_STATS;
gs->len = n_stats;
ifethtool_ioctl_call(sock, ifname, gs);

/* 3. 获取值 */
struct ethtool_stats *stats = calloc(1, sizeof(*stats) + n_stats * sizeof(uint64_t));
stats->cmd = ETHTOOL_GSTATS;
stats->n_stats = n_stats;
ifethtool_ioctl_call(sock, ifname, stats);
```

## 开发建议

- 变长接口采用两次查询：先拿数量，再按数量分配内存
- 设置类接口遵循"先读后改后写"的模式
- 不要假定所有网卡都支持所有命令，`-EOPNOTSUPP` 需要作为正常分支处理
- 对 feature/offload 接口，不要跳过 `NETDEV_HW_FEATURES` 检查
- 成功设置 feature 后，真实硬件状态还依赖 `SIOCETHTOOL_SYNC_FEAT` 同步路径
