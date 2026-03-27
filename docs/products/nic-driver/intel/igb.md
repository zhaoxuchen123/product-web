# igb 系列 · Intel 千兆网卡

<script setup>
import ChangelogEntry from '../../../.vitepress/theme/components/ChangelogEntry.vue'
import BoardTabs from '../../../.vitepress/theme/components/BoardTabs.vue'

const boards = [
  {
    name: 'i210-T1',
    vendor: 'Intel',
    status: 'stable',
    diffs: [
      { label: '速率',      value: '1 GbE',       code: false },
      { label: 'PCIe',      value: 'Gen2 x1',     code: false },
      { label: '内置 PHY',  value: '是',           code: false },
      { label: 'MAC 类型',  value: 'i210',         code: true  },
    ],
    notes: [
      '内置 PHY，无需外挂，直接 SGMII/SerDes 连接',
      '支持硬件时间戳（IEEE 1588 PTP）',
      '支持 Wake-on-LAN',
    ],
    snippet:
`nic_cfg_t cfg = {
    .type     = NIC_TYPE_IGB,
    .pcie_bus = 0x02, .pcie_dev = 0x00, .pcie_fn = 0x00,
    .irq      = 16,
    .mode     = NIC_MODE_ISR,
};`,
  },
  {
    name: 'i211-AT',
    vendor: 'Intel',
    status: 'stable',
    diffs: [
      { label: '速率',      value: '1 GbE',       code: false },
      { label: 'PCIe',      value: 'Gen2 x1',     code: false },
      { label: '内置 PHY',  value: '是',           code: false },
      { label: 'MAC 类型',  value: 'i211',         code: true  },
    ],
    notes: [
      'i211 为 i210 的精简版，去掉了 Flash 和部分高级功能',
      'TX/RX 队列数减少至 4，适合成本敏感场景',
    ],
    snippet:
`nic_cfg_t cfg = {
    .type     = NIC_TYPE_IGB,
    .pcie_bus = 0x02, .pcie_dev = 0x00, .pcie_fn = 0x00,
    .irq      = 16,
    .mode     = NIC_MODE_ISR,
};`,
  },
  {
    name: 'i350-T4',
    vendor: 'Intel',
    status: 'stable',
    diffs: [
      { label: '速率',      value: '1 GbE ×4',    code: false },
      { label: 'PCIe',      value: 'Gen2 x4',     code: false },
      { label: '内置 PHY',  value: '是（×4）',     code: false },
      { label: 'MAC 类型',  value: 'i350',         code: true  },
    ],
    notes: [
      'i350-T4 为四口网卡，每口独立 Function，PCIe BDF 各不相同',
      '支持 SR-IOV 虚拟化（最多 8 个 VF/port）',
    ],
    snippet:
`/* i350-T4 四口，每口单独初始化 */
nic_cfg_t cfg0 = { .type = NIC_TYPE_IGB, .pcie_bus=0x04, .pcie_dev=0x00, .pcie_fn=0x00, .irq=20 };
nic_cfg_t cfg1 = { .type = NIC_TYPE_IGB, .pcie_bus=0x04, .pcie_dev=0x00, .pcie_fn=0x01, .irq=21 };
nic_cfg_t cfg2 = { .type = NIC_TYPE_IGB, .pcie_bus=0x04, .pcie_dev=0x00, .pcie_fn=0x02, .irq=22 };
nic_cfg_t cfg3 = { .type = NIC_TYPE_IGB, .pcie_bus=0x04, .pcie_dev=0x00, .pcie_fn=0x03, .irq=23 };`,
  },
]
</script>

<div class="plat-hero">
  <div class="plat-hero-left">
    <div class="plat-breadcrumb"><a href="/products/nic-driver/">网卡驱动库</a> / Intel / igb</div>
    <h1 class="plat-title">igb 系列</h1>
    <p class="plat-mfr">Intel · PCIe 千兆以太网 · i210 / i211 / i350</p>
    <span class="plat-badge stable">稳定版</span>
  </div>
  <div class="plat-hero-stats">
    <div class="plat-stat"><span class="ps-val">1 GbE</span><span class="ps-label">最高速率</span></div>
    <div class="plat-stat"><span class="ps-val">PCIe</span><span class="ps-label">总线</span></div>
    <div class="plat-stat"><span class="ps-val">PTP</span><span class="ps-label">硬件时间戳</span></div>
    <div class="plat-stat"><span class="ps-val">MSI-X</span><span class="ps-label">中断</span></div>
  </div>
</div>

## 安装

```bash
armory install nic-intel-igb
```

```toml
[dependencies]
nic-intel-igb = "^2.2.0"
```

## 支持型号

| 型号 | 速率 | 端口数 | PCIe | 特性 |
|------|------|--------|------|------|
| i210-T1 | 1G | 1 | Gen2 x1 | PTP、WoL、内置 PHY |
| i211-AT | 1G | 1 | Gen2 x1 | 精简版，低功耗 |
| i350-T4 | 1G | 4 | Gen2 x4 | SR-IOV，四口 |

## 板卡配置

选择具体型号查看配置差异：

<BoardTabs :boards="boards" />

## 通用初始化流程

igb 系列通过 PCIe BDF（Bus:Device.Function）定位网卡，无需指定寄存器基地址：

```c
#include <nic_driver.h>

static nic_dev_t g_nic;

void net_init(void)
{
    nic_cfg_t cfg = {
        .type     = NIC_TYPE_IGB,
        .pcie_bus = 0x02,  /* lspci 查看 BDF */
        .pcie_dev = 0x00,
        .pcie_fn  = 0x00,
        .irq      = 16,    /* MSI-X 分配的中断号 */
        .mode     = NIC_MODE_ISR,
    };
    nic_open(&g_nic, &cfg);
}
```

> 通过 `lspci -nn | grep Ethernet` 确认 BDF 地址。

## 性能指标

| 型号 | UDP 发送 | UDP 接收 | TCP 双向 | CPU 占用 |
|------|---------|---------|---------|----------|
| i210 | 942 Mbps | 940 Mbps | 925 Mbps | 2.1% |
| i350-T4 (单口) | 942 Mbps | 941 Mbps | 928 Mbps | 1.9% |

> 测试环境：SylixOS x86，MSI-X 中断，DMA 描述符环 256 项

## 特殊功能

### 硬件时间戳（PTP）

i210/i350 支持 IEEE 1588 硬件时间戳，可用于精确时间同步：

```c
nic_ptp_cfg_t ptp = { .enable = 1, .clk_src = NIC_PTP_CLK_INTERNAL };
nic_ioctl(&g_nic, NIC_IOCTL_SET_PTP, &ptp);
```

### 多队列 RSS

```c
nic_rss_cfg_t rss = { .rx_queues = 4, .hash_type = NIC_RSS_HASH_TCP4 };
nic_ioctl(&g_nic, NIC_IOCTL_SET_RSS, &rss);
```

## 更新记录

<ChangelogEntry version="2.2.0" date="2025-03-05" type="minor">

- 新增 Intel i217 PCIe 千兆网卡驱动
- 统一各驱动的日志输出格式
- 增加驱动自测用例，覆盖率提升至 85%

</ChangelogEntry>

<ChangelogEntry version="2.0.0" date="2024-11-20" type="major">

- 重构驱动接口，`nic_init` 拆分为 `nic_open` / `nic_close`
- 引入 PCIe 设备枚举支持

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
.plat-badge.beta   { background: rgba(234,179,8,.12);  color: #eab308; }
.plat-hero-stats { display: grid; grid-template-columns: repeat(2,1fr); gap: 0.6rem; }
.plat-stat {
  display: flex; flex-direction: column; align-items: center;
  padding: 0.6rem 1rem; border-radius: 10px;
  background: rgba(59,130,246,.06); border: 1px solid rgba(59,130,246,.1);
}
.ps-val   { font-size: 1rem; font-weight: 800; color: var(--vp-c-brand-1); }
.ps-label { font-size: 0.65rem; color: var(--vp-c-text-3); margin-top: 2px; }
</style>
