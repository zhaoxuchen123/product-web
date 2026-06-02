<template>
  <div class="armory-fetch">
    <div class="af-title">Armory 获取</div>
    <p class="af-desc">通过以下命令从 <strong>Armory</strong> 平台获取当前驱动包：</p>
    <pre class="af-code"><code>{{ commandText }}</code></pre>
    <p class="af-link">
      详细内容参考：
      <a :href="detailUrl" target="_blank" rel="noreferrer">{{ packageRef }}</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  pkg: string
  command?: string
  version?: string
  detailHref?: string
}>(), {
  version: '[版本号]',
  detailHref: '#',
})

const packageRef = computed(() => `@nic_drv/${props.pkg}`)
const commandText = computed(() => props.command || `armory get ${packageRef.value}@${props.version}`)
const detailUrl = computed(() => props.detailHref)
</script>

<style scoped>
.armory-fetch {
  margin: 1rem 0 2rem;
  padding: 1rem 1.1rem;
  border: 1px solid var(--card-border);
  border-radius: 12px;
  background: var(--card-bg);
}
.af-title {
  font-size: 1rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin-bottom: 0.35rem;
}
.af-desc,
.af-link {
  margin: 0.4rem 0;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
}
.af-code {
  margin: 0.7rem 0;
  padding: 0.8rem 0.9rem;
  border-radius: 8px;
  overflow-x: auto;
  background: var(--vp-code-block-bg);
}
.af-code code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.84rem;
}
.af-link a {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  text-decoration: none;
}
.af-link a:hover {
  text-decoration: underline;
}
</style>
