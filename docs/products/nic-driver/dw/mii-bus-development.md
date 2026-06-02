# 基于 net_compat 的 MII 总线二次开发

`libdrv_net_compat` 是南京翼辉网络部提供的网络兼容层，包含 Linux 风格的 MII 子系统、PHY 子系统和 MDIO 访问能力。DW 网卡驱动完成 MII 总线初始化与注册后，业务或板级代码可以通过 `libdrv_net_compat` 暴露的接口获取 MII 总线句柄，并对 PHY 寄存器进行读写或扩展调试。

本文适用于需要在 DW 网卡驱动之外访问 MDIO/MII 总线的场景，例如：

- 读取 PHY 标准寄存器或厂商扩展寄存器；
- 调试 PHY link、速率、双工、自协商状态；
- 对板级交换芯片、外部 PHY 做初始化或诊断；
- 基于已有 DW 网卡 MII 总线开发板级辅助命令。

## 前置条件

在进行二次开发前，需要确认：

1. DW 网卡驱动已经正常加载。
2. 网卡驱动已基于 `libdrv_net_compat` 完成 MII 总线初始化与注册。
3. 已知目标 MII 总线名称，例如 DW 驱动常见名称为 `stmmac-0`。
4. 已知目标 PHY 地址和寄存器地址。

## 获取 MII 总线

通过 `mdio_find_bus` 获取已注册的 MII 总线句柄：

```c
struct mii_bus *mdio_find_bus(const char *mdio_name);
```

参数 `mdio_name` 为网卡驱动注册 MII 总线时使用的名称。以下示例通过 `stmmac-0` 查找 DW 网卡注册的 MII 总线：

```c
#include <linux/phy.h>

static struct mii_bus *s_mii;

int board_mii_init(void)
{
    s_mii = mdio_find_bus("stmmac-0");
    if (!s_mii) {
        printk("Can not find mii bus.\n");
        return -1;
    }

    printk("Found mii bus.\n");
    return 0;
}
```

如果获取失败，通常需要检查网卡驱动是否已加载、MII 总线名称是否正确，以及当前网卡是否实际注册了 MDIO 总线。

## 读写 PHY 寄存器

获取 `struct mii_bus` 后，可使用其中的 `read`、`write` 回调访问 PHY 寄存器。

### 写寄存器

```c
static int board_mii_write(uint8_t phy_addr, uint8_t reg_addr, uint16_t reg_val)
{
    int ret;

    if (!s_mii || !s_mii->write) {
        return -ENODEV;
    }

    ret = s_mii->write(s_mii, phy_addr, reg_addr, reg_val);
    if (ret < 0) {
        printk("board_mii_write: ret = %d\n", ret);
    }

    return ret;
}
```

### 读寄存器

```c
static int board_mii_read(uint8_t phy_addr, uint8_t reg_addr, uint16_t *reg_val)
{
    int value;

    if (!s_mii || !s_mii->read || !reg_val) {
        return -EINVAL;
    }

    value = s_mii->read(s_mii, phy_addr, reg_addr);
    if (value < 0) {
        return (value == -EIO || value == -ENODEV) ? -ENODEV : -EIO;
    }

    *reg_val = (uint16_t)value;
    return 0;
}
```

## 调试建议

- 先读取 PHY ID 相关寄存器，确认 `phy_addr` 配置正确。
- 访问前确认网卡驱动已完成初始化，否则 `mdio_find_bus` 可能找不到总线。
- 多网口共用 MDIO 时，应优先确认提供 MDIO 总线的网卡已先创建。
- 读写厂商扩展寄存器时，应参考对应 PHY 数据手册，避免误改关键配置。
- 如果访问返回 `-ENODEV` 或 `-EIO`，重点检查 MDC/MDIO 硬件连线、PHY 地址、复位 GPIO 和时钟配置。

