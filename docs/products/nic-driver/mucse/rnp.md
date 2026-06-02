# N400 · 沐创千兆网卡

<script setup>
import BoardTabs from '../../../.vitepress/theme/components/BoardTabs.vue'
import ChangelogEntry from '../../../.vitepress/theme/components/ChangelogEntry.vue'

const boards = [
  {
    name: 'N400L-X4',
    vendor: '沐创（MUCSE）',
    status: 'stable',
    diffs: [
      { label: '速率',    value: '1 GbE ×4',       code: false },
      { label: '总线',    value: 'PCIe 2.0 x4',    code: false },
      { label: '接口',    value: '背板 / SFP / SGMII', code: false },
      { label: '封装',    value: 'BGA256 17mm × 17mm', code: false },
    ],
    notes: [
      '四口千兆网络控制器芯片',
      '支持 RSS，最大 256 个队列，默认配置 32 个队列',
      '支持 SR-IOV，最多 4 个 PF，每个 PF 支持 8 个 VF',
      '支持 PTP / IEEE 1588v2 时间戳能力',
    ],
  },
  {
    name: 'N400L-X2',
    vendor: '沐创（MUCSE）',
    status: 'stable',
    diffs: [
      { label: '速率',    value: '1 GbE ×2',       code: false },
      { label: '总线',    value: 'PCIe 2.0 x4',    code: false },
      { label: '接口',    value: '背板 / SFP / SGMII', code: false },
      { label: '封装',    value: 'BGA256 17mm × 17mm', code: false },
    ],
    notes: [
      '两口千兆网络控制器芯片',
      '支持 RSS，最大 256 个队列，默认配置 32 个队列',
      '支持 SR-IOV，最多 4 个 PF，每个 PF 支持 8 个 VF',
      '适用于支持 PCIe 接口的平台',
    ],
  },
]
</script>

<div class="plat-hero">
  <div class="plat-hero-left">
    <div class="plat-breadcrumb"><a href="/products/nic-driver/">网卡驱动库</a> / 沐创系列 / N400</div>
    <h1 class="plat-title">N400</h1>
    <p class="plat-mfr">沐创（MUCSE）· PCIe 千兆 N400</p>
    <VersionBadge product="nic-driver/rnp" />
    <a class="armory-link" href="http://10.7.1.31/acohub/armory/package/nic_drv/rnp_nic_drv/1.0.0" target="_blank">Armory 获取</a>
  </div>
  <div class="plat-hero-stats">
    <div class="plat-stat"><span class="ps-val">1 GbE</span><span class="ps-label">网口速率</span></div>
    <div class="plat-stat"><span class="ps-val">PCIe 2.0 x4</span><span class="ps-label">总线接口</span></div>
    <div class="plat-stat"><span class="ps-val">SR-IOV</span><span class="ps-label">虚拟化</span></div>
    <div class="plat-stat"><span class="ps-val">PTP</span><span class="ps-label">时间同步</span></div>
  </div>
</div>

<ArmoryFetch pkg="libdrv_rnp" command="armory get @nic_drv/rnp_nic_drv@1.0.0" detailHref="http://10.7.1.31/acohub/armory/package/nic_drv/rnp_nic_drv/1.0.0" />

## 软件简介

沐创网卡驱动工程名称为 `libdrv_rnp`，由沐创 Linux 版本驱动移植到 SylixOS，并对 SylixOS 驱动框架相关内容进行了适配。N400 为 PCIe 千兆网卡，当前文档仅覆盖已支持的 N400L-X4 与 N400L-X2 型号。

驱动依赖 Linux 兼容层，适用于支持 PCIe 接口的平台，当前支持 `arm64` 与 `x86` 架构。

## 安装与加载

如果 BSP 工程已静态链接 `liblinuxcompat.a`，设备 BSP 启动成功后可直接加载沐创网卡驱动：

```bash
insmod libdrv_rnp.ko
```

如果 BSP 工程没有链接 `liblinuxcompat.a`，需要先加载 Linux 兼容层模块，再加载网卡驱动：

```bash
insmod linuxcompat.ko
insmod libdrv_rnp.ko
```

卸载驱动时可执行：

```bash
rmmod libdrv_rnp
```

加载后驱动自动枚举 PCIe 总线上的沐创 N400 设备，并按系统网卡命名规则创建 `eth0`、`eth1` 等网络接口。

## 支持型号

<BoardTabs :boards="boards" />

## 支持设备列表

当前沐创网卡驱动支持以下 N400 千兆以太网控制器：

| 型号 | 速率与端口 | 总线 | 接口形态 | 备注 |
|------|------------|------|----------|------|
| N400L-X4 | 1 GbE ×4 | PCIe 2.0 x4 | 背板 / SFP / SGMII | 四口千兆 |
| N400L-X2 | 1 GbE ×2 | PCIe 2.0 x4 | 背板 / SFP / SGMII | 两口千兆 |

## 支持平台

| 平台 | 架构 | 支持情况 |
|------|------|----------|
| PC 主板 | x86 | 已支持 |
| RK3568 | arm64 | 已支持 |

## 主要特性

- 多队列：支持 RSS，最大 256 个队列，默认配置 32 个队列。
- 虚拟化：支持 SR-IOV，支持 4 个 PF，每个 PF 支持 8 个 VF。
- 卸载能力：支持校验和卸载、TSO、GRO、TCO、RCO 等能力。
- 二层能力：支持 VLAN、QinQ、流控 FC / PFC、VEB、QoS 与最大 9564 字节巨帧。
- 时间同步：支持 PTP 与 IEEE 1588v2，支持数据包时间戳上传。
- 协议能力：支持 IPv4 / IPv6，支持 IEEE 802.1P、802.1Q、802.2、802.3ac、802.3az、802.3x、802.3z、802.3ad 等标准。

## 最新更新

<ChangelogEntry version="0.2.5" date="2026-06-02" type="minor">

- 更新沐创 N400 支持范围，明确当前支持 N400L-X4 / N400L-X2 千兆网卡

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
