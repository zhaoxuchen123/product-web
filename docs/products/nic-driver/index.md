---
layout: page
---

<script setup>
import { Cpu } from 'lucide-vue-next'
import ProductPageHero from '../../.vitepress/theme/components/ProductPageHero.vue'
import ChangelogEntry from '../../.vitepress/theme/components/ChangelogEntry.vue'
import PlatformCard from '../../.vitepress/theme/components/PlatformCard.vue'
</script>

<ProductPageHero
  title="SylixOS 网卡驱动库"
  desc="为 SylixOS 提供统一的网卡驱动库，通过 Armory 发布，保证 SylixOS 平台网络的高性能、高可靠性。"
  :icon="Cpu"
  tag="活跃开发"
  startLink="./getting-started"
  changelogLink="./changelog"
  :stats="[
    { value: '20+', label: '支持芯片/系列' },
    { value: '40G', label: '最高支持速率' },
    { value: 'Armory', label: '包管理发布' },
  ]"
  :features="[
    '零拷贝 DMA 收发，降低 CPU 占用',
    '中断 / 轮询双模式，支持实时以太网',
    '支持 ifethtool，定制化配置网络参数',
    '同一架构无视 soc 与板卡，一个静态库处处适用',
  ]"
/>

<div class="pd-body">

## DesignWare 网卡（DW 网卡）

DesignWare GMAC（DW MAC）是广泛集成于各类 SoC 的以太网控制器 IP，我们针对以下平台进行了适配与优化：

<div class="platform-grid">

<PlatformCard
  href="./dw/platforms/rk3568"
  chip="RK3568"
  manufacturer="Rockchip"
  pkg="libstmicro"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: '1Gx2', label: '速率' },
    { value: 'TSO', label: '硬件卸载' },
    { value: '支持', label: '时间戳' },
  ]"
  :tags="['硬件时间戳', '稳定', '支持 ECAT']"
/>

<PlatformCard
  href="./dw/platforms/rk3588"
  chip="RK3588"
  manufacturer="Rockchip"
  pkg="dw-gmac-rk3588"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: '1G×2', label: '速率' },
    { value: 'RGMII', label: '接口' },
    { value: 'SMP', label: '多核' },
  ]"
  :tags="['双网口', 'RSS', '多队列']"
/>

<PlatformCard
  href="./dw/platforms/d9"
  chip="芯驰 D9"
  manufacturer="芯驰科技"
  pkg="dw-gmac-d9"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: '1G', label: '速率' },
    { value: 'RGMII', label: '接口' },
    { value: 'ASIL-B', label: '功能安全' },
  ]"
  :tags="['车规', '功能安全', 'AUTOSAR']"
/>

<PlatformCard
  href="./dw/platforms/ls2k1000"
  chip="LS2K1000"
  manufacturer="龙芯中科"
  pkg="dw-gmac-ls2k1000"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: '1G', label: '速率' },
    { value: 'RGMII', label: '接口' },
    { value: 'MIPS64', label: '架构' },
  ]"
  :tags="['龙芯', 'MIPS64', '国产芯片']"
/>

</div>

## Intel PCIe 系列

独立 PCIe 网卡，适用于 x86 及具备 PCIe 总线的嵌入式平台：

<div class="platform-grid">

<PlatformCard
  href="./intel/igb"
  chip="igb 系列"
  manufacturer="Intel · i210 / i211 / i350"
  pkg="nic-intel-igb"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: '1G', label: '速率' },
    { value: 'PCIe', label: '总线' },
    { value: 'PTP', label: '时间戳' },
  ]"
  :tags="['千兆', 'MSI-X', 'SR-IOV']"
/>

<PlatformCard
  href="./intel/igc"
  chip="igc 系列"
  manufacturer="Intel · I225-V / I226-V"
  pkg="nic-intel-igc"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: '2.5G', label: '速率' },
    { value: 'PCIe', label: 'Gen3 x1' },
    { value: 'TSN', label: '时敏网络' },
  ]"
  :tags="['2.5GbE', 'MSI-X', 'TSN']"
/>

<PlatformCard
  href="./intel/i40e"
  chip="i40e 系列"
  manufacturer="Intel · X710 / XL710"
  pkg="nic-intel-i40e"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: '40G', label: '速率' },
    { value: 'PCIe', label: 'Gen3 x8' },
    { value: '128', label: '队列/口' },
  ]"
  :tags="['万兆', 'SR-IOV', 'RSS']"
/>

</div>

## 裕太微系列（MOTORCOMM）

<div class="platform-grid">

<PlatformCard
  href="./yt6801"
  chip="YT6801"
  manufacturer="裕太微电子（MOTORCOMM）"
  pkg="libdrv-yt6801"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: '2.5G', label: '速率' },
    { value: 'PCIe', label: '总线' },
    { value: '国产', label: '自主可控' },
  ]"
  :tags="['2.5GbE', '国产芯片']"
/>

</div>

## 网讯网卡（Wangxun）

网讯科技自研网卡，Vendor ID `0x8088`，覆盖千兆与万兆场景：

<div class="platform-grid">

<PlatformCard
  href="./wangxun/ngbe"
  chip="WX1860"
  manufacturer="网讯科技"
  pkg="libngbe"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: '1 GbE', label: '速率' },
    { value: '最多×4', label: '端口数' },
    { value: 'PCIe', label: '总线' },
  ]"
  :tags="['千兆', '国产芯片', '多口']"
/>

<PlatformCard
  href="./wangxun/txgbe"
  chip="WX1820"
  manufacturer="网讯科技"
  pkg="libtxgbe"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: '10 GbE', label: '速率' },
    { value: 'SFP+', label: '接口' },
    { value: 'SR-IOV', label: '虚拟化' },
  ]"
  :tags="['万兆', '国产芯片', 'SR-IOV']"
/>

</div>

## 沐创网卡（MUCSE）

沐创自研 PCIe 万兆网卡，Vendor ID `0x8848`：

<div class="platform-grid">

<PlatformCard
  href="./mucse/rnp"
  chip="N10"
  manufacturer="沐创科技"
  pkg="libdrv_rnp"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: '10 GbE', label: '速率' },
    { value: 'SFP+', label: '接口' },
    { value: 'SR-IOV', label: '虚拟化' },
  ]"
  :tags="['万兆', '国产芯片', 'SR-IOV']"
/>

<PlatformCard
  href="./mucse/rnp500"
  chip="N500"
  manufacturer="沐创科技"
  pkg="libdrv_rnp_n500"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: '10 GbE', label: '速率' },
    { value: 'SFP+', label: '接口' },
    { value: 'RSS', label: '多队列' },
  ]"
  :tags="['万兆', '国产芯片']"
/>

</div>

## 最新更新

<ChangelogEntry version="HEAD" pkg="ngbe · WX1860" date="2026-03-06" type="minor">

- 新增单播 / 组播地址过滤功能
- 新增 Shell 命令支持读写 PHY 寄存器
- 修复 pbuf 链接收时无法释放的问题

</ChangelogEntry>

<ChangelogEntry version="1.3.6.9" pkg="txgbe · WX1820" date="2025-11-06" type="patch">

- 修复 SR-IOV 场景 VF 混杂模式下跨 VLAN 收包问题
- 修复 QinQ 双层 VLAN 报文导致 TX 单元挂起

</ChangelogEntry>

[查看完整更新日志 →](./changelog)

</div>

<style>
.pd-body { max-width: 900px; margin: 0 auto; padding: 0 1.5rem 4rem; }
.pd-body h2 { font-size: 1.3rem; font-weight: 700; margin: 2rem 0 1rem; letter-spacing: -0.02em; }
.pd-body h2::before {
  content: '';
  display: inline-block; width: 4px; height: 1em;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 2px; margin-right: 0.6rem;
  vertical-align: middle; position: relative; top: -1px;
}
.platform-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  margin: 1rem 0 2rem;
}
</style>
