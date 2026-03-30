<template>
  <div class="pph">
    <div class="pph-bg"><div class="pph-grid" /></div>
    <div class="pph-inner">
      <div class="pph-left">
        <a :href="withBase('/products/')" class="pph-back"><ArrowLeft :size="14" /> 所有产品</a>
        <div class="pph-icon-wrap">
          <component :is="icon" :size="32" :stroke-width="1.5" class="pph-icon" />
        </div>
        <h1 class="pph-title">{{ title }}</h1>
        <p class="pph-desc">{{ desc }}</p>
        <div class="pph-badges">
          <span :class="['pph-tag', tagClass]">{{ tag }}</span>
          <code v-if="version" class="pph-ver">v{{ version }}</code>
          <span v-if="updated" class="pph-updated">更新于 {{ updated }}</span>
        </div>
        <div class="pph-actions">
          <a :href="withBase(changelogLink)" class="pph-btn-ghost"><Clock :size="14" /> 更新日志</a>
          <a :href="withBase(startLink)" class="pph-btn-primary">快速开始 <ArrowRight :size="14" /></a>
        </div>
      </div>
      <div class="pph-right">
        <div class="pph-stats">
          <div class="pph-stat" v-for="s in stats" :key="s.label">
            <span class="pph-stat-num">{{ s.value }}</span>
            <span class="pph-stat-label">{{ s.label }}</span>
          </div>
        </div>
        <div class="pph-features">
          <div class="pph-feat" v-for="f in features" :key="f">
            <CheckCircle :size="14" class="pph-feat-icon" />
            <span>{{ f }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { ArrowLeft, ArrowRight, Clock, CheckCircle } from 'lucide-vue-next'
import type { Component } from 'vue'

const props = defineProps<{
  title: string
  desc: string
  icon: Component
  tag: string
  version?: string
  updated?: string
  startLink: string
  changelogLink: string
  stats: { value: string; label: string }[]
  features: string[]
}>()

const tagClass = computed(() => {
  const t = props.tag
  if (t.includes('稳定')) return 'tag-stable'
  if (t.includes('活跃') || t.includes('开发')) return 'tag-active'
  return 'tag-default'
})
</script>

<style scoped>
.pph {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--card-border);
  padding: 3rem 0 2.5rem;
  margin-bottom: 2rem;
}
.pph-bg { position: absolute; inset: 0; z-index: 0; }
.pph-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(59,130,246,.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59,130,246,.05) 1px, transparent 1px);
  background-size: 32px 32px;
}
.pph-inner {
  position: relative; z-index: 1;
  max-width: 900px; margin: 0 auto; padding: 0 1.5rem;
  display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;
}
@media(max-width: 768px) { .pph-inner { grid-template-columns: 1fr; gap: 1.5rem; } }
.pph-back {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 0.8rem; color: var(--vp-c-text-3);
  text-decoration: none; margin-bottom: 1.25rem;
  transition: color .2s;
}
.pph-back:hover { color: var(--vp-c-brand-1); }
.pph-icon-wrap {
  width: 56px; height: 56px; border-radius: 16px;
  background: linear-gradient(135deg, rgba(59,130,246,.12), rgba(139,92,246,.12));
  border: 1px solid rgba(59,130,246,.2);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1rem;
}
.pph-icon { color: var(--vp-c-brand-1); }
.pph-title { font-size: 2rem; font-weight: 800; letter-spacing: -0.03em; margin: 0 0 0.6rem; color: var(--vp-c-text-1); }
.pph-desc { font-size: 0.95rem; color: var(--vp-c-text-2); line-height: 1.7; margin: 0 0 1rem; }
.pph-badges { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
.pph-tag { font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 20px; }
.tag-stable { background: var(--tag-stable-bg); color: var(--tag-stable-color); }
.tag-active  { background: var(--tag-active-bg);  color: var(--tag-active-color); }
.tag-default { background: var(--tag-default-bg); color: var(--tag-default-color); }
.pph-ver {
  font-family: var(--vp-font-family-mono); font-size: 0.78rem;
  background: var(--vp-c-default-soft); padding: 2px 8px; border-radius: 6px; color: var(--vp-c-text-2);
}
.pph-updated { font-size: 0.8rem; color: var(--vp-c-text-3); }
.pph-actions { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }
.pph-btn-primary {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 0.5rem 1.2rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff; font-weight: 600; font-size: 0.88rem;
  border-radius: 8px; text-decoration: none;
  box-shadow: 0 3px 14px rgba(59,130,246,.4);
  transition: box-shadow .2s, transform .2s;
}
.pph-btn-primary:hover { box-shadow: 0 5px 20px rgba(59,130,246,.55); transform: translateY(-1px); }
.pph-btn-ghost {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 0.5rem 1.1rem;
  border: 1px solid var(--card-border); border-radius: 8px;
  font-size: 0.88rem; font-weight: 500; color: var(--vp-c-text-2);
  text-decoration: none; transition: border-color .2s, color .2s;
}
.pph-btn-ghost:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.pph-stats {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem; margin-bottom: 1rem;
}
.pph-stat {
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  background: var(--card-bg);
  text-align: center; backdrop-filter: blur(8px);
}
.pph-stat-num { display: block; font-size: 1.3rem; font-weight: 800; color: var(--vp-c-brand-1); letter-spacing: -0.03em; }
.pph-stat-label { font-size: 0.72rem; color: var(--vp-c-text-3); }
.pph-features { display: flex; flex-direction: column; gap: 0.5rem; }
.pph-feat {
  display: flex; align-items: center; gap: 0.5rem;
  font-size: 0.875rem; color: var(--vp-c-text-2);
}
.pph-feat-icon { color: var(--tag-stable-color); flex-shrink: 0; }
</style>
