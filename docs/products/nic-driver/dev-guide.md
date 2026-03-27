# 二次开发指南

本文档面向需要在网卡驱动库基础上进行二次开发的工程师，包括新增驱动适配、自定义 PHY 驱动、扩展 ioctl 接口等内容。

## 驱动架构概览

```
┌─────────────────────────────────┐
│         上层协议栈 / 应用         │
├─────────────────────────────────┤
│       统一 NIC API 层            │  nic_open / send / recv / ioctl
├──────────────┬──────────────────┤
│  DW GMAC 驱动 │  其他驱动 (i210…) │  具体控制器实现
├──────────────┴──────────────────┤
│           PHY 抽象层             │  phy_read / phy_write / auto-neg
├─────────────────────────────────┤
│         硬件寄存器 / DMA          │
└─────────────────────────────────┘
```

## 新增控制器驱动

### 1. 实现驱动操作表

每个驱动需实现 `nic_ops_t` 结构体中的回调函数：

```c
#include <nic_driver.h>

static int my_nic_open(nic_dev_t *dev, const nic_cfg_t *cfg);
static int my_nic_send(nic_dev_t *dev, const uint8_t *buf, size_t len);
static int my_nic_recv(nic_dev_t *dev, uint8_t *buf, size_t max_len);
static int my_nic_ioctl(nic_dev_t *dev, int cmd, void *arg);
static void my_nic_close(nic_dev_t *dev);

static const nic_ops_t my_nic_ops = {
    .open  = my_nic_open,
    .send  = my_nic_send,
    .recv  = my_nic_recv,
    .ioctl = my_nic_ioctl,
    .close = my_nic_close,
};
```

### 2. 注册驱动类型

```c
/* 在驱动初始化时注册（通常在 BSP 启动阶段调用） */
nic_driver_register(NIC_TYPE_MY_NIC, &my_nic_ops);
```

### 3. 分配私有数据

```c
typedef struct {
    uintptr_t  base;      /* 寄存器基地址 */
    uint32_t   tx_head;
    uint32_t   rx_head;
    /* ... 其他私有字段 */
} my_nic_priv_t;

static int my_nic_open(nic_dev_t *dev, const nic_cfg_t *cfg)
{
    my_nic_priv_t *priv = nic_alloc_priv(dev, sizeof(my_nic_priv_t));
    priv->base = cfg->base;
    /* 初始化硬件 ... */
    return 0;
}
```

## 自定义 PHY 驱动

标准 PHY（实现 IEEE 802.3 MII 寄存器）通常无需特殊处理。对于需要特定初始化序列的 PHY（如 TJA1103 车规 PHY），可注册自定义 PHY 驱动：

```c
static int tja1103_config(phy_dev_t *phy);
static int tja1103_status(phy_dev_t *phy, phy_status_t *st);

static const phy_ops_t tja1103_ops = {
    .phy_id   = 0x0180DC80,   /* OUI + Model */
    .phy_mask = 0xFFFFFFF0,
    .config   = tja1103_config,
    .status   = tja1103_status,
};

/* 注册后，phy_init 会自动匹配 ID */
phy_driver_register(&tja1103_ops);
```

## 扩展 ioctl 接口

驱动可在 `my_nic_ioctl` 中处理自定义命令（`cmd >= NIC_IOCTL_VENDOR_BASE`）：

```c
#define MY_IOCTL_SET_LOOPBACK  (NIC_IOCTL_VENDOR_BASE + 1)

static int my_nic_ioctl(nic_dev_t *dev, int cmd, void *arg)
{
    switch (cmd) {
    case NIC_IOCTL_SET_ITR:
        /* 中断合并配置 */
        return my_nic_set_itr(dev, (nic_itr_cfg_t *)arg);
    case MY_IOCTL_SET_LOOPBACK:
        /* 自定义命令：回环测试 */
        return my_nic_set_loopback(dev, *(int *)arg);
    default:
        return -ENOTSUP;
    }
}
```

## DMA 描述符环设计

推荐使用固定大小的描述符环，避免动态内存分配：

```c
#define TX_DESC_NUM  256
#define RX_DESC_NUM  256

typedef struct {
    uint32_t  status;
    uint32_t  ctrl;
    uint32_t  buf_addr;
    uint32_t  next_desc;
} dw_desc_t;

/* 描述符环必须对齐到 cache line（通常 64 字节） */
static dw_desc_t tx_ring[TX_DESC_NUM] __attribute__((aligned(64)));
static dw_desc_t rx_ring[RX_DESC_NUM] __attribute__((aligned(64)));
```

## 调试技巧

### 启用驱动调试日志

```c
nic_set_log_level(NIC_LOG_DEBUG);  /* 输出寄存器读写、DMA 状态 */
```

### 统计计数器

```c
nic_stats_t stats;
nic_ioctl(&g_nic, NIC_IOCTL_GET_STATS, &stats);
printf("tx_packets=%lu rx_packets=%lu tx_errors=%lu rx_errors=%lu\n",
       stats.tx_packets, stats.rx_packets,
       stats.tx_errors,  stats.rx_errors);
```

## 相关资源

- [快速开始](./getting-started)
- [问题反馈](./feedback)
- [更新日志](./changelog)