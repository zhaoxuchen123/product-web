# igc 系列 · Intel 2.5GbE 网卡

<script setup>
import BoardTabs from '../../../.vitepress/theme/components/BoardTabs.vue'

const boards = [
  {
    name: 'I225-V',
    vendor: 'Intel',
    status: 'stable',
    diffs: [
      { label: '速率',    value: '2.5 GbE',       code: false },
      { label: '总线',    value: 'PCIe Gen3 x1',   code: false },
      { label: '接口',    value: 'RJ45',           code: false },
      { label: '硬件版本', value: 'B3 及以上推荐',  code: false },
    ],
    notes: [
      'I225-V B0/B1 存在 PCIe Gen3 稳定性问题，建议使用 B3 及以上版本',
      '驱动自动检测版本，B0/B1 降至 PCIe Gen2 运行',
    ],
    snippet:
`/* PCIe 设备自动枚举，驱动加载后按顺序创建网口 */
netcard_intel_attach();`,
  },
  {
    name: 'I225-LM',
    vendor: 'Intel',
    status: 'stable',
    diffs: [
      { label: '速率',    value: '2.5 GbE',       code: false },
      { label: '总线',    value: 'PCIe Gen3 x1',   code: false },
      { label: '接口',    value: 'RJ45',           code: false },
      { label: '定位',    value: '企业/工业级',     code: false },
    ],
    notes: [
      'LM 为企业/工控版本，支持 AMT 主动管理技术',
      'TSN（时敏网络）特性：支持 IEEE 802.1Qbv、802.1Qbu',
    ],
    snippet:
`netcard_intel_attach();`,
  },
  {
    name: 'I226-V',
    vendor: 'Intel',
    status: 'stable',
    diffs: [
      { label: '速率',    value: '2.5 GbE',       code: false },
      { label: '总线',    value: 'PCIe Gen3 x1',   code: false },
      { label: '接口',    value: 'RJ45',           code: false },
      { label: '定位',    value: 'I225 继任者',     code: false },
    ],
    notes: [
      'I226 修复了 I225 的 PCIe Gen3 稳定性问题，新设计推荐优先选用',
      '与 I225 共用驱动，设备 ID（8086:125C）自动识别',
    ],
    snippet:
`netcard_intel_attach();`,
  },
  {
    name: 'I226-LM',
    vendor: 'Intel',
    status: 'stable',
    diffs: [
      { label: '速率',    value: '2.5 GbE',       code: false },
      { label: '总线',    value: 'PCIe Gen3 x1',   code: false },
      { label: '接口',    value: 'RJ45',           code: false },
      { label: '定位',    value: '企业/工业级',     code: false },
    ],
    notes: [
      'I226-LM 为 I226 企业版，支持 AMT 和完整 TSN 特性',
    ],
    snippet:
`netcard_intel_attach();`,
  },
]
</script>
<div class="plat-hero">
  <div class="plat-hero-left">
    <div class="plat-breadcrumb"><a href="/products/nic-driver/">网卡驱动库</a> / Intel / igc</div>
    <h1 class="plat-title">igc 系列</h1>
    <p class="plat-mfr">Intel · PCIe 2.5GbE · I225 / I226</p>
    <span class="plat-badge stable">稳定版</span>
  </div>
  <div class="plat-hero-stats">
    <div class="plat-stat"><span class="ps-val">2.5 GbE</span><span class="ps-label">网口速率</span></div>
    <div class="plat-stat"><span class="ps-val">PCIe</span><span class="ps-label">Gen3 x1</span></div>
    <div class="plat-stat"><span class="ps-val">TSN</span><span class="ps-label">时敏网络</span></div>
    <div class="plat-stat"><span class="ps-val">PTP</span><span class="ps-label">硬件时间戳</span></div>
  </div>
</div>

## 安装

igc 系列与 igb 共用同一个 Armory 包：

```bash
armory get @nic_drv/netcard-intel
```

在 BSP Makefile 中链接（与 igb 相同）：

```makefile
LOCAL_DEPEND_LIB := \
    ... \
    -lintel \
    -Wl,--whole-archive \
    -llinuxcompat \
    -Wl,--no-whole-archive \
    ...
```

## 加载驱动

```c
VOID bspBoardNetifAttch(VOID)
{
    extern int netcard_intel_attach(void);
    netcard_intel_attach();
}
```

驱动自动识别 I225/I226 全系列设备 ID，按 PCI 枚举顺序创建网口。

## 支持型号

<BoardTabs :boards="boards" />

## 支持设备列表

| 型号 | 速率 | 接口 | 特性 |
|------|------|------|------|
| I225-V | 2.5 GbE | RJ45 | PTP、TSN、消费级 |
| I225-LM | 2.5 GbE | RJ45 | PTP、TSN、AMT、企业级 |
| I225-IT | 2.5 GbE | RJ45 | 工业级温度范围 |
| I225-K | 2.5 GbE | RJ45 | 嵌入式版本 |
| I226-V | 2.5 GbE | RJ45 | I225 继任者，修复 Gen3 问题 |
| I226-LM | 2.5 GbE | RJ45 | 企业级，完整 TSN |
| I226-IT | 2.5 GbE | RJ45 | 工业级温度范围 |
| I226-K | 2.5 GbE | RJ45 | 嵌入式版本 |

## 关于 I225 B0/B1 硬件问题

I225-V 早期版本（B0/B1 stepping）存在 PCIe Gen3 链路稳定性问题，表现为偶发链路降速或中断。驱动内置检测逻辑，自动将 B0/B1 限制在 PCIe Gen2 速率运行，不影响网络功能，但 PCIe 带宽略有下降。

B3 及以后版本已修复此问题，新设计建议选用 I226 系列。

## 已知问题

<div class="issues">
  <div class="issue">
    <span class="issue-tag open">已知</span>
    <span>I225-V B0/B1 在 PCIe Gen3 下偶发链路不稳定，驱动已自动降至 Gen2 规避</span>
  </div>
</div>

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
.plat-hero-stats { display: grid; grid-template-columns: repeat(2,1fr); gap: 0.6rem; }
.plat-stat {
  display: flex; flex-direction: column; align-items: center;
  padding: 0.6rem 1rem; border-radius: 10px;
  background: rgba(59,130,246,.06); border: 1px solid rgba(59,130,246,.1);
}
.ps-val   { font-size: 1rem; font-weight: 800; color: var(--vp-c-brand-1); }
.ps-label { font-size: 0.65rem; color: var(--vp-c-text-3); margin-top: 2px; }
.issues { display: flex; flex-direction: column; gap: 0.5rem; margin: 1rem 0; }
.issue {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.6rem 0.9rem; border-radius: 8px;
  border: 1px solid var(--card-border);
  font-size: 0.85rem; color: var(--vp-c-text-2);
}
.issue-tag { font-size: 0.65rem; font-weight: 700; padding: 2px 7px; border-radius: 4px; flex-shrink: 0; }
.issue-tag.open { background: rgba(234,179,8,.12); color: #eab308; }
</style>
