<template>
  <div class="bt-wrap">
    <div class="bt-tabbar">
      <button
        v-for="(b, i) in boards"
        :key="b.name"
        :class="['bt-tab', { active: active === i }]"
        @click="active = i"
      >
        {{ b.name }}
      </button>
    </div>

    <div class="bt-panel">
      <div class="bt-panel-header">
        <div class="bt-board-meta">
          <span class="bt-board-name">{{ current.name }}</span>
          <span v-if="current.vendor" class="bt-board-vendor">{{ current.vendor }}</span>
        </div>
        <span v-if="current.status" :class="['bt-badge', 'status-' + current.status]">{{ statusLabel(current.status) }}</span>
      </div>

      <div class="bt-diff-grid">
        <div class="bt-diff-item" v-for="d in current.diffs" :key="d.label">
          <span class="bt-diff-label">{{ d.label }}</span>
          <span class="bt-diff-val"><code v-if="d.code">{{ d.value }}</code><template v-else>{{ d.value }}</template></span>
        </div>
      </div>

      <div v-if="current.notes && current.notes.length" class="bt-notes">
        <div class="bt-notes-title">特殊说明</div>
        <ul class="bt-notes-list">
          <li v-for="n in current.notes" :key="n">{{ n }}</li>
        </ul>
      </div>

      <div v-if="current.snippet" class="bt-snippet">
        <div class="bt-snippet-label">配置代码片段</div>
        <pre class="bt-pre"><code>{{ current.snippet }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Board {
  name: string
  vendor?: string
  status?: 'stable' | 'beta' | 'wip'
  diffs: { label: string; value: string; code?: boolean }[]
  notes?: string[]
  snippet?: string
}

const props = defineProps<{ boards: Board[] }>()
const active = ref(0)
const current = computed(() => props.boards[active.value])

function statusLabel(s: string) {
  return { stable: '稳定', beta: 'Beta', wip: '开发中' }[s] ?? s
}
</script>

<style scoped>
.bt-wrap { margin: 1rem 0 2rem; }
.bt-tabbar {
  display: flex; flex-wrap: wrap; gap: 0.4rem;
  margin-bottom: -1px; position: relative; z-index: 1;
}
.bt-tab {
  padding: 0.4rem 1rem;
  font-size: 0.82rem; font-weight: 600;
  border: 1px solid var(--card-border);
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
  cursor: pointer; transition: color .15s, background .15s;
}
.bt-tab:hover { color: var(--vp-c-text-1); }
.bt-tab.active {
  background: var(--card-bg);
  color: var(--vp-c-brand-1);
  border-color: var(--card-border);
  border-bottom-color: var(--card-bg);
}
.bt-panel {
  padding: 1.25rem;
  border-radius: 0 8px 8px 8px;
  border: 1px solid var(--card-border);
  background: var(--card-bg);
}
.bt-panel-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 1rem;
}
.bt-board-name { font-size: 1rem; font-weight: 700; color: var(--vp-c-text-1); }
.bt-board-vendor { font-size: 0.78rem; color: var(--vp-c-text-3); margin-left: 0.5rem; }
.bt-badge { font-size: 0.68rem; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
.status-stable { background: rgba(34,197,94,.12); color: #22c55e; }
.status-beta   { background: rgba(234,179,8,.12);  color: #eab308; }
.status-wip    { background: rgba(156,163,175,.12); color: #9ca3af; }
.bt-diff-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.6rem; margin-bottom: 1rem;
}
.bt-diff-item {
  display: flex; flex-direction: column; gap: 2px;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  background: rgba(59,130,246,.04);
  border: 1px solid rgba(59,130,246,.08);
}
.bt-diff-label { font-size: 0.68rem; color: var(--vp-c-text-3); }
.bt-diff-val   { font-size: 0.88rem; font-weight: 600; color: var(--vp-c-text-1); }
.bt-diff-val code {
  font-family: var(--vp-font-family-mono); font-size: 0.78rem;
  background: var(--vp-c-default-soft); padding: 1px 5px; border-radius: 4px;
  color: var(--vp-c-brand-1);
}
.bt-notes { margin-bottom: 1rem; }
.bt-notes-title { font-size: 0.78rem; font-weight: 700; color: var(--vp-c-text-2); margin-bottom: 0.4rem; }
.bt-notes-list { margin: 0; padding-left: 1.2rem; }
.bt-notes-list li { font-size: 0.84rem; color: var(--vp-c-text-2); line-height: 1.7; }
.bt-snippet { }
.bt-snippet-label { font-size: 0.78rem; font-weight: 700; color: var(--vp-c-text-2); margin-bottom: 0.4rem; }
.bt-pre {
  margin: 0; padding: 0.9rem 1rem;
  background: var(--vp-c-default-soft);
  border-radius: 8px; overflow-x: auto;
  font-size: 0.78rem; line-height: 1.6;
}
</style>
