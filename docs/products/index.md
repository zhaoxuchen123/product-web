# 所有产品

<script setup>
import ProductGrid from '../.vitepress/theme/components/ProductGrid.vue'
import ProductCard from '../.vitepress/theme/components/ProductCard.vue'
</script>

我们围绕 SylixOS 平台提供完整的网络基础软件产品体系，涵盖底层网卡驱动到上层网络配置工具。所有产品均通过 **Armory 包管理器**统一分发，支持按需安装与独立升级。

## 核心产品

<ProductGrid>
  <ProductCard
    title="SylixOS 网卡驱动库"
    desc="为 SylixOS 提供统一的网卡驱动库，支持 DW GMAC、Intel、网讯、沐创、裕太微等主流厂商 20+ 款芯片，通过 Armory 发布，保证 SylixOS 平台网络的高性能、高可靠性。"
    link="/products/nic-driver/"
    icon="🔌"
    tag="活跃开发"
    version="2.4.1"
    updated="2025-12"
  />
  <ProductCard
    title="网络工具"
    desc="ifethtool、vndbind、xgro、pppd 等 SylixOS 网络配置与调试工具，兼容 Linux 主流工具使用习惯，方便开发者快速上手。"
    link="/products/tools/"
    icon="🛠️"
    tag="活跃开发"
    version="2.0.0"
    updated="2026-03"
  />
</ProductGrid>

## 即将推出

我们正在规划面向市场的独立网络产品与解决方案，敬请期待。如有需求或建议，欢迎通过 [问题反馈](/products/nic-driver/feedback) 与我们沟通。
