<template>
  <a :href="href" class="pc-card">
    <div class="pc-header">
      <div class="pc-chip-icon">
        <Cpu :size="18" stroke-width="1.5" />
      </div>
      <div class="pc-chip-info">
        <span class="pc-chip-name">{{ chip }}</span>
        <span class="pc-manufacturer">{{ manufacturer }}</span>
      </div>
      <span :class="['pc-status', 'status-' + status]">{{ statusLabel }}</span>
    </div>

    <div class="pc-pkg">
      <code class="pc-pkg-name">{{ pkg }}</code>
    </div>

    <div class="pc-specs">
      <div class="pc-spec" v-for="s in specs" :key="s.label">
        <span class="pc-spec-val">{{ s.value }}</span>
        <span class="pc-spec-label">{{ s.label }}</span>
      </div>
    </div>

    <div class="pc-tags">
      <span class="pc-tag" v-for="t in tags" :key="t">{{ t }}</span>
    </div>

    <div class="pc-footer">
      <span class="pc-arrow">详情 <ArrowRight :size="12" /></span>
    </div>
  </a>
</template>

<script setup lang="ts">
import { Cpu, ArrowRight } from 'lucide-vue-next'

defineProps<{
  href: string
  chip: string
  manufacturer: string
  pkg: string
  status: 'stable' | 'beta' | 'wip'
  statusLabel: string
  specs: { value: string; label: string }[]
  tags: string[]
}>()
</script>

<style scoped>
.pc-card {
  display: flex; flex-direction: column; gap: 0.75rem;
  padding: 1.25rem;
  border-radius: 14px;
  border: 1px solid var(--card-border);
  background: var(--card-bg);
  backdrop-filter: blur(8px);
  text-decoration: none; color: inherit;
  transition: border-color .2s, box-shadow .2s, transform .2s;
  cursor: pointer;
}
.pc-card:hover {
  border-color: var(--card-hover-border);
  box-shadow: var(--card-hover-shadow);
  transform: translateY(-3px);
}
.pc-header { display: flex; align-items: center; gap: 0.6rem; }
.pc-chip-icon {
  width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
  background: linear-gradient(135deg, rgba(59,130,246,.15), rgba(139,92,246,.15));
  border: 1px solid rgba(59,130,246,.2);
  display: flex; align-items: center; justify-content: center;
  color: var(--vp-c-brand-1);
}
.pc-chip-info { flex: 1; min-width: 0; }
.pc-chip-name { display: block; font-size: 0.92rem; font-weight: 700; color: var(--vp-c-text-1); }
.pc-manufacturer { font-size: 0.72rem; color: var(--vp-c-text-3); }
.pc-status { font-size: 0.68rem; font-weight: 700; padding: 2px 8px; border-radius: 20px; flex-shrink: 0; }
.status-stable { background: rgba(34,197,94,.12); color: #22c55e; }
.status-beta   { background: rgba(234,179,8,.12);  color: #eab308; }
.status-wip    { background: rgba(156,163,175,.12); color: #9ca3af; }
.pc-pkg { }
.pc-pkg-name {
  font-family: var(--vp-font-family-mono); font-size: 0.78rem;
  background: var(--vp-c-default-soft); padding: 3px 10px;
  border-radius: 6px; color: var(--vp-c-brand-1); letter-spacing: 0.3px;
}
.pc-specs {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;
}
.pc-spec {
  display: flex; flex-direction: column; align-items: center;
  padding: 0.5rem 0.25rem;
  border-radius: 8px;
  background: rgba(59,130,246,.04);
  border: 1px solid rgba(59,130,246,.08);
}
.pc-spec-val   { font-size: 0.88rem; font-weight: 700; color: var(--vp-c-text-1); }
.pc-spec-label { font-size: 0.65rem; color: var(--vp-c-text-3); margin-top: 1px; }
.pc-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.pc-tag {
  font-size: 0.68rem; padding: 2px 7px; border-radius: 4px;
  background: var(--vp-c-default-soft); color: var(--vp-c-text-3);
}
.pc-footer { display: flex; justify-content: flex-end; margin-top: auto; }
.pc-arrow {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 0.78rem; color: var(--vp-c-brand-1); font-weight: 600;
  transition: gap .2s;
}
.pc-card:hover .pc-arrow { gap: 7px; }
</style>