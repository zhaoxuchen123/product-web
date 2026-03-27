<template>
  <a :href="link" class="pc">
    <!-- 顶部光晕装饰 -->
    <div class="pc__glow" />

    <div class="pc__top">
      <div class="pc__icon-wrap">
        <span class="pc__icon">{{ icon }}</span>
      </div>
      <span v-if="tag" :class="['pc__tag', tagClass]">{{ tag }}</span>
    </div>

    <h3 class="pc__title">{{ title }}</h3>
    <p class="pc__desc">{{ desc }}</p>

    <div class="pc__footer">
      <div class="pc__meta">
        <span v-if="version" class="pc__version">v{{ version }}</span>
        <span v-if="updated" class="pc__sep">·</span>
        <span v-if="updated" class="pc__updated">{{ updated }}</span>
      </div>
      <span class="pc__cta">查看详情 <span class="pc__arrow">→</span></span>
    </div>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  desc: string
  link: string
  icon?: string
  tag?: string
  version?: string
  updated?: string
}>()

const tagClass = computed(() => {
  const t = props.tag ?? ''
  if (t.includes('稳定')) return 'pc__tag--stable'
  if (t.includes('活跃') || t.includes('开发')) return 'pc__tag--active'
  if (t.toLowerCase().includes('beta')) return 'pc__tag--beta'
  return 'pc__tag--default'
})
</script>

<style scoped>
.pc {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid var(--card-border);
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.pc:hover {
  border-color: var(--card-hover-border);
  box-shadow: var(--card-hover-shadow);
  transform: translateY(-4px);
}

/* 悬停时光晕出现 */
.pc__glow {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
}

.pc:hover .pc__glow {
  opacity: 1;
}

.pc__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.pc__icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.12));
  border: 1px solid rgba(59,130,246,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.pc__tag {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.3px;
  white-space: nowrap;
}

.pc__tag--stable  { background: var(--tag-stable-bg); color: var(--tag-stable-color); }
.pc__tag--active  { background: var(--tag-active-bg);  color: var(--tag-active-color); }
.pc__tag--beta    { background: var(--tag-beta-bg);    color: var(--tag-beta-color); }
.pc__tag--default { background: var(--tag-default-bg); color: var(--tag-default-color); }

.pc__title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: var(--vp-c-text-1);
  letter-spacing: -0.01em;
}

.pc__desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.65;
  flex: 1;
  margin: 0 0 1.25rem;
}

.pc__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.pc__meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.pc__version {
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-default-soft);
  padding: 1px 6px;
  border-radius: 5px;
  font-size: 0.75rem;
}

.pc__sep { opacity: 0.4; }

.pc__cta {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  display: flex;
  align-items: center;
  gap: 3px;
}

.pc__arrow {
  display: inline-block;
  transition: transform 0.2s ease;
}

.pc:hover .pc__arrow {
  transform: translateX(4px);
}
</style>
