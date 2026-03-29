<template>
  <div class="cl">
    <div class="cl__header">
      <div class="cl__left">
        <span class="cl__version">v{{ version }}</span>
        <span v-if="pkg" class="cl__pkg">{{ pkg }}</span>
        <span
          v-for="t in types"
          :key="t"
          :class="['cl__type', `cl__type--${t}`]"
        >{{ typeLabel[t] }}</span>
      </div>
      <time class="cl__date">{{ date }}</time>
    </div>
    <div class="cl__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
type ReleaseType = 'major' | 'minor' | 'patch' | 'beta'

const props = defineProps<{
  version: string
  date: string
  type?: ReleaseType | ReleaseType[]
  pkg?: string
}>()

const typeLabel: Record<ReleaseType, string> = {
  major: '重大版本',
  minor: '功能更新',
  patch: '修复补丁',
  beta: 'Beta',
}

const types = computed(() =>
  props.type ? (Array.isArray(props.type) ? props.type : [props.type]) : []
)
</script>

<style scoped>
.cl {
  position: relative;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.25rem;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  background: var(--card-bg);
  backdrop-filter: blur(8px);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.cl::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  border-radius: 3px 0 0 3px;
  background: linear-gradient(180deg, #3b82f6, #8b5cf6);
}

.cl:hover {
  border-color: var(--card-hover-border);
  box-shadow: var(--card-hover-shadow);
}

.cl__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.85rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cl__left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.cl__version {
  font-family: var(--vp-font-family-mono);
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  letter-spacing: -0.02em;
}

.cl__pkg {
  font-family: var(--vp-font-family-mono);
  font-size: 0.72rem;
  font-weight: 600;
  padding: 2px 9px;
  border-radius: 20px;
  background: rgba(139,92,246,0.1);
  color: #8b5cf6;
  border: 1px solid rgba(139,92,246,0.2);
}
.cl__type {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 9px;
  border-radius: 20px;
  letter-spacing: 0.3px;
}

.cl__type--major { background: rgba(239,68,68,0.12);  color: #ef4444; }
.cl__type--minor { background: rgba(34,197,94,0.12);  color: #22c55e; }
.cl__type--patch { background: rgba(59,130,246,0.12); color: #3b82f6; }
.cl__type--beta  { background: rgba(168,85,247,0.12); color: #a855f7; }

.dark .cl__type--major { background: rgba(239,68,68,0.2);  color: #f87171; }
.dark .cl__type--minor { background: rgba(34,197,94,0.2);  color: #4ade80; }
.dark .cl__type--patch { background: rgba(59,130,246,0.2); color: #60a5fa; }
.dark .cl__type--beta  { background: rgba(168,85,247,0.2); color: #c084fc; }

.cl__date {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

.cl__body {
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.cl__body :deep(ul) {
  padding-left: 1.2rem;
  margin: 0;
}

.cl__body :deep(li) {
  margin: 0.25rem 0;
}

.cl__body :deep(strong) {
  color: var(--vp-c-text-1);
  font-weight: 600;
}
</style>
