---
layout: page
---

<script setup>
import { Package } from 'lucide-vue-next'
import ProductPageHero from '../../.vitepress/theme/components/ProductPageHero.vue'
import PlatformCard from '../../.vitepress/theme/components/PlatformCard.vue'
</script>

<ProductPageHero
  title="SylixOS 网络产品"
  desc="面向工业现场与行业场景提供独立网络产品与解决方案，覆盖环网冗余、动态路由、链路可靠性和网络收敛测试等能力。"
  :icon="Package"
  tag="活跃开发"
  startLink="./ring-suit/"
  :stats="[
    { value: '2', label: '产品' },
    { value: '环网 / 路由', label: '协议能力' },
    { value: 'SylixOS', label: '目标平台' },
  ]"
  :features="[
    '面向工业以太网场景提供独立产品化交付',
    '覆盖链路冗余、环网保护、动态路由与故障倒换能力',
    '支持通过 Armory 获取并按需部署',
    '提供快速开始、配置指南、选型建议和收敛测试说明',
  ]"
/>

<div class="pd-body">

## 产品列表

<div class="platform-grid">

<PlatformCard
  href="./ring-suit/"
  chip="ring-suit"
  manufacturer="南京翼辉网络部"
  pkg="ring-suit"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: 'RSTP/ERPS/MRP', label: '协议' },
    { value: '环网冗余', label: '能力' },
    { value: '套件', label: '类型' },
  ]"
  :tags="['环网冗余', '工业以太网', '链路保护']"
/>

<PlatformCard
  href="./frr/"
  chip="FRRouting"
  manufacturer="南京翼辉网络部"
  pkg="frr"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: 'v1.0.0', label: 'SDK' },
    { value: 'FRR 10.2', label: '基线' },
    { value: 'OSPF/BFD', label: '协议' },
  ]"
  :tags="['动态路由', 'OSPF', 'BFD', 'vtysh']"
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