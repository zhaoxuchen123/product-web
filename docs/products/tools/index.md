---
layout: page
---

<script setup>
import { Terminal } from 'lucide-vue-next'
import ProductPageHero from '../../.vitepress/theme/components/ProductPageHero.vue'
import PlatformCard from '../../.vitepress/theme/components/PlatformCard.vue'
</script>

<ProductPageHero
  title="SylixOS 网络工具"
  desc="为 SylixOS 网络子系统提供配置、诊断与调试工具，兼容 Linux 主流工具使用习惯。"
  :icon="Terminal"
  tag="活跃开发"
  startLink="./ifethtool/"
  :stats="[
    { value: '5', label: '工具' },
    { value: 'ethtool', label: '兼容接口' },
    { value: 'SylixOS', label: '目标平台' },
  ]"
  :features="[
    '兼容 Linux ethtool 命令行风格，迁移成本低',
    '支持链路速率/双工查询与设置',
    '支持 feature/offload、ring、coalesce、channels 配置',
    '驱动通过标准 ethtool_ops 接口接入，无需适配工具本身',
  ]"
/>

<div class="pd-body">

## 工具列表

<div class="platform-grid">

<PlatformCard
  href="./ifethtool/"
  chip="ifethtool"
  manufacturer="南京翼辉网络部"
  pkg="ifethtool"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: 'v1.0.0', label: '版本' },
    { value: 'ethtool', label: '兼容' },
    { value: 'CLI', label: '类型' },
  ]"
  :tags="['命令行工具', '网卡配置', 'ethtool 兼容']"
/>

<PlatformCard
  href="./vndbind"
  chip="vndbind"
  manufacturer="南京翼辉网络部"
  pkg="libdrv_vndbind"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: 'v1.0.0', label: '版本' },
    { value: 'VND', label: '虚拟网卡' },
    { value: 'CLI', label: '类型' },
  ]"
  :tags="['虚拟网卡', '网卡绑定']"
/>

<PlatformCard
  href="./xgro"
  chip="xgro"
  manufacturer="南京翼辉网络部"
  pkg="xgro"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: 'v2.0.0', label: '版本' },
    { value: 'GRO', label: '接收卸载' },
    { value: 'TCP/UDP', label: '协议' },
  ]"
  :tags="['GRO', '性能优化', '接收卸载']"
/>

<PlatformCard
  href="./netfirewall"
  chip="netfirewall"
  manufacturer="南京翼辉网络部"
  pkg="netfirewall"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: 'v1.0.0', label: '版本' },
    { value: '/dev/netfw', label: '接口' },
    { value: 'Framework', label: '类型' },
  ]"
  :tags="['防火墙框架', '流量过滤', '驱动控制']"
/>

<PlatformCard
  href="./pppd"
  chip="pppd"
  manufacturer="南京翼辉网络部"
  pkg="pppd"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: 'v1.1.0', label: '版本' },
    { value: 'PPPoS', label: '协议' },
    { value: 'PAP/CHAP', label: '认证' },
  ]"
  :tags="['PPP', '串口', '拨号服务器']"
/>

</div>

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