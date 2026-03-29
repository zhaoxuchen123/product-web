# 所有产品

<script setup>
import ProductGrid from '../.vitepress/theme/components/ProductGrid.vue'
import ProductCard from '../.vitepress/theme/components/ProductCard.vue'
</script>

<ProductGrid>
  <ProductCard
    title="SylixOS 网卡驱动库"
    desc="为 SylixOS 提供统一的网卡驱动库，通过 Armory 发布，保证 SylixOS 平台网络的高性能、高可靠性。"
    link="/products/nic-driver/"
    icon="🔌"
    tag="活跃开发"
    version="2.4.1"
    updated="2025-12"
  />
  <ProductCard
    title="网络工具"
    desc="ifethtool、vndbind、xgro、pppd 等 SylixOS 网络配置与调试工具，兼容 Linux 主流工具使用习惯。"
    link="/products/tools/"
    icon="🛠️"
    tag="活跃开发"
    version="2.0.0"
    updated="2026-03"
  />
</ProductGrid>
