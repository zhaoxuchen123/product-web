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
    tag="稳定版"
    version="2.4.1"
    updated="2025-12"
  />
  <ProductCard
    title="网络协议栈"
    desc="轻量级 TCP/IP 协议栈，支持 IPv4/IPv6 双栈，针对资源受限嵌入式环境深度优化。"
    link="/products/network-stack/"
    icon="🌐"
    tag="稳定版"
    version="3.1.0"
    updated="2026-01"
  />
  <ProductCard
    title="网络中间件工具"
    desc="提供 MQTT、HTTP、CoAP、Modbus TCP 等工业与物联网常用协议中间件，开箱即用。"
    link="/products/middleware/"
    icon="🔧"
    tag="活跃开发"
    version="1.8.2"
    updated="2026-03"
  />
</ProductGrid>
