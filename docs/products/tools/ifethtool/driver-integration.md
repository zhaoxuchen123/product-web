# ifethtool 驱动接入

本文面向 SylixOS 网卡驱动开发者，说明如何让驱动支持 `ifethtool`。

## 调用链

```
用户程序 ioctl(sock, SIOCETHTOOL, &ifr)
  → 驱动 ioctl 入口收到 SIOCETHTOOL
  → 转发给 ifethtool_ioctl(net_device, ifr)
  → 兼容层根据 cmd 分发
  → 调用驱动的 ethtool_ops 回调
```

驱动只需完成两件事：
1. 在 `ioctl` 路径接住 `SIOCETHTOOL` 并转发
2. 给 `net_device` 绑定 `ethtool_ops`

## 最小接入

### ioctl 分发

```c
static int mynic_ioctl(struct netdev *dev, int cmd, void *arg)
{
    struct ifreq *rq = (struct ifreq *)arg;

    switch (cmd) {
    case SIOCETHTOOL:
        return ifethtool_ioctl((struct net_device *)dev, rq);
    case SIOCETHTOOL_SYNC_FEAT:
        return mynic_set_features((struct net_device *)dev,
                                  NETDEV_FEATURES(dev));
    default:
        return -EOPNOTSUPP;
    }
}
```

### 绑定 ethtool_ops

```c
static const struct ethtool_ops mynic_ethtool_ops = {
    .get_drvinfo         = mynic_get_drvinfo,
    .get_link            = ethtool_op_get_link,
    .get_link_ksettings  = mynic_get_link_ksettings,
    .set_link_ksettings  = mynic_set_link_ksettings,
};

void mynic_set_ethtool_ops(struct net_device *netdev)
{
    netdev->ethtool_ops = &mynic_ethtool_ops;
}
```

在 probe 中调用：

```c
mynic_set_ethtool_ops(ndev);
NETDEV_HW_FEATURES_SET(&ndev->net_dev, mynic_get_hw_features(...));
NETDEV_FEATURES_SET(&ndev->net_dev, mynic_get_active_features(ndev));
```

## 命令与 ethtool_ops 对应关系

| 命令 | 最低需实现 |
|------|----------|
| `ifethtool IFNAME` | `get_link_ksettings` + `get_link` |
| `-i` | `get_drvinfo` |
| `-a` / `-A` | `get_pauseparam` / `set_pauseparam` |
| `-k` / `-K` | 正确初始化 `NETDEV_HW_FEATURES` / `NETDEV_FEATURES` |
| `-g` / `-G` | `get_ringparam` / `set_ringparam` |
| `-c` / `-C` | `get_coalesce` / `set_coalesce` |
| `-l` / `-L` | `get_channels` / `set_channels` |
| `-m` | `net_device.hwaddr` 有效 |
| `-M` | `drv->ioctl(..., SIOCSIFHWADDR, ...)` |
| `-t` | `net_device.mtu` 有效 |
| `-T` | `drv->ioctl(..., SIOCSIFMTU, ...)` |
| `-p` | 当前 `IFF_PROMISC` 状态可读 |
| `-P` | `drv->rxmode(netdev, flags)` |
| `-u` / `-U` | `get_light_suspend` / `set_light_suspend` |
| `-S` | `get_sset_count` + `get_strings` + `get_ethtool_stats` |
| `-r` | `nway_reset` |
| `-s` | `get_link_ksettings` + `set_link_ksettings` |

## 接入检查清单

- `SIOCETHTOOL` 已进入 `ifethtool_ioctl()`
- `netdev->ethtool_ops` 已绑定
- `get_link_ksettings()` 可返回正确速率和双工
- `get_drvinfo()` 可返回驱动名称和版本
- `NETDEV_HW_FEATURES` 已按真实硬件能力初始化
- `NETDEV_FEATURES` 已按当前启用状态初始化
- `SIOCETHTOOL_SYNC_FEAT` 已接入（用于 feature 同步到硬件）
- `drv->ioctl()` 已支持 `SIOCSIFHWADDR` 和 `SIOCSIFMTU`
- `drv->rxmode()` 已实现混杂模式切换
- 统计接口的数量、名称和值顺序一致
- 不支持的命令统一返回 `-EOPNOTSUPP`

## 常见问题

**`ifethtool IFNAME` 返回 `Operation not supported`**

检查是否已分发 `SIOCETHTOOL`，是否给 `ethtool_ops` 赋值，是否实现 `get_link_ksettings`。

**`-k` 能看到能力但打开后不生效**

检查 `ETHTOOL_SFEATURES` 之后是否处理了 `SIOCETHTOOL_SYNC_FEAT`，`set_features()` 是否真正更新了硬件寄存器。

**`-S` 输出错乱**

检查 `get_sset_count()` 返回数量是否正确，`get_strings()` 和 `get_ethtool_stats()` 顺序是否一致。

**`-G` / `-L` / `-C` 设置后系统不稳定**

检查是否需要通过 `netJobAdd()` 异步执行，设置后是否同步刷新了软件缓存和硬件状态。

**`-M` / `-T` 返回不支持**

检查驱动 `ioctl` 是否支持 `SIOCSIFHWADDR` 和 `SIOCSIFMTU`。

**`-P` 设置后不生效**

检查驱动是否实现了 `rxmode()`，以及软件 flags 是否与硬件过滤状态同步。
