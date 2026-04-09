---
layout: page
---

<script setup>
import { Code } from 'lucide-vue-next'
import ProductPageHero from '../../.vitepress/theme/components/ProductPageHero.vue'
import PlatformCard from '../../.vitepress/theme/components/PlatformCard.vue'
</script>

<ProductPageHero
  title="SylixOS 开发工具"
  desc="为 SylixOS 开发者提供高效的命令行工具链，覆盖工程初始化、编译构建、设备管理与部署上传等完整开发流程。"
  :icon="Code"
  tag="活跃开发"
  startLink="./sydev/"
  :stats="[
    { value: '1', label: '工具' },
    { value: 'CLI', label: '交互方式' },
    { value: 'SylixOS', label: '目标平台' },
  ]"
  :features="[
    '一键初始化工作空间与项目，降低环境搭建成本',
    '支持编译、清理、重编译及 FTP 上传全流程',
    '模板化配置管理，支持跨环境复用',
    '非交互模式支持 CI/CD 自动化集成',
  ]"
/>

<div class="pd-body">

## 工具列表

<div class="platform-grid">

<PlatformCard
  href="./sydev/"
  chip="sydev"
  manufacturer="南京翼辉网络部"
  pkg="@haawpc/sydev"
  status="stable"
  statusLabel="稳定"
  :specs="[
    { value: 'v0.4.16', label: '版本' },
    { value: 'Node.js', label: '运行时' },
    { value: 'CLI', label: '类型' },
  ]"
  :tags="['命令行工具', '工程管理', '编译构建', '设备部署']"
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
