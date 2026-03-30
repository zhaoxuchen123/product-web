# rnp · 沐创 N10 万兆网卡

<script setup>
import BoardTabs from '../../../.vitepress/theme/components/BoardTabs.vue'
import ChangelogEntry from '../../../.vitepress/theme/components/ChangelogEntry.vue'

const boards = [
  {
    name: 'N10',
    vendor: '沐创（MUCSE）',
    status: 'stable',
    diffs: [
      { label: '速率',    value: '10 GbE',         code: false },
      { label: '总线',    value: 'PCIe',            code: false },
      { label: 'PCI ID',  value: '0x8848:0x1000',  code: true  },
      { label: '接口',    value: 'SFP+',            code: false },
    ],
    notes: [
      '支持 10G / 1G / 100M 自适应',
      '支持 SFP+ 光模块及 DAC 铜缆',
      '支持 SR-IOV 虚拟化',
      '支持 RSS 多队列分流',
    ],
    snippet:
`/* 加载驱动模块后自动枚举 PCIe 设备 */
insmod libdrv_rnp.ko`,
  },
  {
    name: 'N10C',
    vendor: '沐创（MUCSE）',
    status: 'stable',
    diffs: [
      { label: '速率',    value: '10 GbE',         code: false },
      { label: '总线',    value: 'PCIe',            code: false },
      { label: 'PCI ID',  value: '0x8848:0x1C00',  code: true  },
      { label: '接口',    value: 'SFP+',            code: false },
    ],
    notes: [
      'N10 系列 C 版本，接口与特性与 N10 相同',
      '支持 10G / 1G / 100M 自适应',
    ],
    snippet:
`insmod libdrv_rnp.ko`,
  },
]
</script>

<div class="plat-hero">
  <div class="plat-hero-left">
    <div class="plat-breadcrumb"><a href="/products/nic-driver/">网卡驱动库</a> / 沐创系列 / rnp</div>
    <h1 class="plat-title">rnp</h1>
    <p class="plat-mfr">沐创（MUCSE）· PCIe 万兆 N10</p>
    <VersionBadge product="nic-driver/rnp" />
    <a class="armory-link" href="http://10.7.1.31/acohub/armory/" target="_blank">Armory 获取</a>
  </div>
  <div class="plat-hero-stats">
    <div class="plat-stat"><span class="ps-val">10 GbE</span><span class="ps-label">网口速率</span></div>
    <div class="plat-stat"><span class="ps-val">PCIe</span><span class="ps-label">总线接口</span></div>
    <div class="plat-stat"><span class="ps-val">SR-IOV</span><span class="ps-label">虚拟化</span></div>
    <div class="plat-stat"><span class="ps-val">国产</span><span class="ps-label">自主可控</span></div>
  </div>
</div>

## 安装与加载

rnp 驱动以内核模块（.ko）方式发布，运行时动态加载：

```bash
# 加载驱动模块
insmod libdrv_rnp.ko

# 卸载
rmmod libdrv_rnp
```

加载后驱动自动枚举 PCIe 总线上的沐创 N10 / N10C 设备，按顺序创建 `eth0`、`eth1`...

## 支持型号

<BoardTabs :boards="boards" />

## 支持设备列表

rnp 驱动支持以下沐创万兆以太网控制器：

| 型号 | PCI Device ID | 接口 | 备注 |
|------|---------------|------|------|
| N10  | 0x1000 | SFP+ | 主流万兆型号 |
| N10C | 0x1C00 | SFP+ | N10 C 版本 |

Vendor ID 均为 `0x8848`。

## 最新更新

<ChangelogEntry version="0.2.5" date="2025-10-27" type="minor">

- 初始版本发布

</ChangelogEntry>

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
