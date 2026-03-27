# igc 系列 · Intel 2.5GbE 网卡

<script setup>
import ChangelogEntry from '../../../.vitepress/theme/components/ChangelogEntry.vue'
import BoardTabs from '../../../.vitepress/theme/components/BoardTabs.vue'

const boards = [
  {
    name: 'I225-V',
    vendor: 'Intel',
    status: 'stable',
    diffs: [
      { label: '速率',     value: '2.5 GbE',     code: false },
      { label: 'PCIe',     value: 'Gen3 x1',     code: false },
      { label: '内置 PHY', value: '是',           code: false },
      { label: '硬件版本', value: 'B3 及以上',    code: false },
    ],
    notes: [
      'I225-V B0/B1 存在 PCIe Gen3 稳定性问题，驱动默认降至 Gen2 运行',
      'B3 版本已修复，可通过 NIC_IOCTL_GET_HW_VER 查询硬件版本',
    ],
    snippet:
`nic_cfg_t cfg = {
    .type     = NIC_TYPE_IGC,
    .pcie_bus = 0x03, .pcie_dev = 0x00, .pcie_fn = 0x00,
    .irq      = 17,
    .mode     = NIC_MODE_ISR,
};`,
  },
  {
    name: 'I226-V',
    vendor: 'Intel',
    status: 'stable',
    diffs: [
      { label: '速率',     value: '2.5 GbE',     code: false },
      { label: 'PCIe',     value: 'Gen3 x1',     code: false },
      { label: '内置 PHY', value: '是',           code: false },
      { label: '备注',     value: 'I225 继任者',  code: false },
    ],
    notes: [
      'I226 修复了 I225 的 PCIe Gen3 稳定性问题，新设计推荐优先选用',
      '驱动与 I225 共用，自动识别设备 ID（8086:125C）',
    ],
    snippet:
`nic_cfg_t cfg = {
    .type     = NIC_TYPE_IGC,
    .pcie_bus = 0x03, .pcie_dev = 0x00, .pcie_fn = 0x00,
    .irq      = 17,
    .mode     = NIC_MODE_ISR,
};`,
  },
]
</script>

<div class="plat-hero">
  <div class="plat-hero-left">
    <div class="plat-breadcrumb"><a href="/products/nic-driver/">网卡驱动库</a> / Intel / igc</div>
    <h1 class="plat-title">igc 系列</h1>
    <p class="plat-mfr">Intel · PCIe 2.5GbE · I225-V / I226-V</p>
    <span class="plat-badge stable">稳定版</span>
  </div>
  <div class="plat-hero-stats">
    <div class="plat-stat"><span class="ps-val">2.5 GbE</span><span class="ps-label">最高速率</span></div>
    <div class="plat-stat"><span class="ps-val">PCIe</span><span class="ps-label">Gen3 x1</span></div>
    <div class="plat-stat"><span class="ps-val">TSN</span><span class="ps-label">时间敏感网络</span></div>
    <div class="plat-stat"><span class="ps-val">MSI-X</span><span class="ps-label">中断</span></div>
  </div>
</div>

## 安装

```bash
armory install nic-intel-igc
```

```toml
[dependencies]
nic-intel-igc = "^1.1.0"
```

## 支持型号

| 型号 | 速率 | PCIe | 备注 |
|------|------|------|------|
| I225-V | 2.5G/1G/100M | Gen3 x1 | B3 版本修复稳定性问题 |
| I225-LM | 2.5G/1G/100M | Gen3 x1 | 企业级，含 AMT |
| I226-V | 2.5G/1G/100M | Gen3 x1 | I225 继任，推荐新设计使用 |

## 板卡 / 型号配置

<BoardTabs :boards="boards" />

## 初始化示例

```c
#include <nic_driver.h>

static nic_dev_t g_nic;

void net_init(void)
{
    nic_cfg_t cfg = {
        .type     = NIC_TYPE_IGC,
        .pcie_bus = 0x03,
        .pcie_dev = 0x00,
        .pcie_fn  = 0x00,
        .irq      = 17,
        .mode     = NIC_MODE_ISR,
    };
    nic_open(&g_nic, &cfg);
}
```

## I225 版本兼容说明

| 步进 | PCIe Gen3 | 推荐 |
|------|-----------|------|
| B0 / B1 | 不稳定，自动降 Gen2 | 不推荐新设计 |
| B3 | 正常 | 可用 |
| I226-V | 正常 | **推荐** |

## 性能指标

| 测试场景 | 吞吐量 | CPU 占用 |
|----------|--------|----------|
| UDP 单流发送 | 2.35 Gbps | 3.2% |
| UDP 单流接收 | 2.34 Gbps | 3.5% |
| TCP 双向   | 2.28 Gbps | 6.1% |

> 测试环境：SylixOS x86，I226-V，MSI-X

## 更新记录

<ChangelogEntry version="1.1.0" date="2025-07-10" type="minor">

- 新增 I226-V 设备 ID 支持
- 修复 I225-V B0/B1 PCIe Gen3 降速逻辑

</ChangelogEntry>

<ChangelogEntry version="1.0.0" date="2025-04-01" type="major">

- igc 系列（I225/I226）首次支持

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
