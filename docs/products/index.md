# 所有产品

<script setup>
import ProductGrid from '../.vitepress/theme/components/ProductGrid.vue'
import ProductCard from '../.vitepress/theme/components/ProductCard.vue'
</script>

我们围绕 SylixOS 平台提供完整的网络基础软件产品体系，涵盖底层网卡驱动、网络产品、网络协议、网络配置工具和开发工具。所有产品均通过 **Armory 包管理器**统一分发，支持按需安装与独立升级。

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
    title="网络产品"
    desc="面向工业现场与行业场景提供独立网络产品与解决方案，覆盖环网冗余、动态路由、链路可靠性和网络收敛测试等能力。"
    link="/products/network-products/"
    icon="📦"
    tag="活跃开发"
    version="2 products"
    updated="2026-06"
  />
  <ProductCard
    title="网络协议"
    desc="面向 SylixOS 网络业务场景提供协议模块与协议适配能力，覆盖 EtherCAT、MQTT、时间同步、链路管理与行业协议扩展。"
    link="/products/protocols/"
    icon="🌐"
    tag="活跃开发"
    version="0.1.0"
    updated="2026-06"
  />
  <ProductCard
    title="网络工具"
    desc="ifethtool、vndbind、xgro、netfirewall、linuxptp、pppd 等 SylixOS 网络配置与调试工具，兼容 Linux 主流工具使用习惯，方便开发者快速上手。"
    link="/products/tools/"
    icon="🛠️"
    tag="活跃开发"
    version="2.0.0"
    updated="2026-03"
  />
  <ProductCard
    title="开发工具"
    desc="sydev 等 SylixOS 开发命令行工具，覆盖工程初始化、编译构建、设备管理与部署上传，支持模板化配置与 CI/CD 集成。"
    link="/products/dev-tools/"
    icon="💻"
    tag="活跃开发"
    version="0.4.16"
    updated="2026-03"
  />
</ProductGrid>

## 持续更新

我们会持续补充新的网络产品、协议模块和工具能力。如有需求或建议，欢迎通过 [问题反馈](/products/nic-driver/feedback) 与我们沟通。