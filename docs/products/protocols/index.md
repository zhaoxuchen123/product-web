---
layout: page
---

<script setup>
import { Network } from 'lucide-vue-next'
import ProductPageHero from '../../.vitepress/theme/components/ProductPageHero.vue'
import PlatformCard from '../../.vitepress/theme/components/PlatformCard.vue'
</script>

<ProductPageHero
  title="网络协议"
  desc="面向 SylixOS 网络业务场景提供协议模块与协议适配能力，覆盖时间同步、链路管理、网络服务与行业协议扩展。"
  :icon="Network"
  tag="活跃开发"
  :stats="[
    { value: 'SylixOS', label: '目标平台' },
    { value: '协议模块', label: '产品形态' },
    { value: 'Armory', label: '包管理发布' },
  ]"
  :features="[
    '沉淀可复用协议模块，降低业务重复适配成本',
    '面向实时网络、工业网络和车载网络场景持续扩展',
    '与网卡驱动库、网络工具联动，形成完整网络能力',
    '通过 Armory 分发，支持按需安装和独立升级',
  ]"
/>

<div class="pd-body">

## 模块定位

网络协议用于承载网卡驱动和网络工具之上的协议能力，重点面向需要在 SylixOS 上复用、部署和维护的网络协议组件。

与其他产品线的关系：

- **网卡驱动库**：提供底层收发、中断、DMA、PHY/MDIO 与硬件时间戳能力。
- **网络工具**：提供配置、诊断、性能优化和运行时调试能力。
- **网络协议**：提供可集成到业务系统中的协议栈、协议服务或行业协议适配。
- **开发工具**：提供工程创建、构建、部署和 CI/CD 支撑。

## 模块列表

<div class="platform-grid">

<PlatformCard
  href="./igh/"
  chip="IgH EtherCAT"
  manufacturer="EtherLab · 南京翼辉网络部"
  pkg="SylixOS_IgH"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: '1.6.3', label: '版本' },
    { value: 'CoE/EoE', label: '能力' },
    { value: '主站', label: '角色' },
  ]"
  :tags="['EtherCAT', '工业以太网', '实时控制']"
/>

<PlatformCard
  href="./mqtt/"
  chip="MQTT"
  manufacturer="OASIS · Eclipse Paho"
  pkg="libpaho_mqtt"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: '3.1.1/5.0', label: '版本' },
    { value: 'Pub/Sub', label: '模型' },
    { value: 'Paho C', label: '实现' },
  ]"
  :tags="['物联网', '发布订阅', 'QoS']"
/>

</div>

## 后续规划

后续可按协议领域继续扩展子模块，例如链路冗余、网络管理、工业以太网、车载以太网和安全通信协议等。

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
