<template>
  <span :class="['plat-badge', versionStatus]">{{ versionText }}</span>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  product: string
}>()

const versionText = ref('···')
const versionStatus = ref('stable')

onMounted(async () => {
  try {
    const res = await fetch('/versions.json')
    if (!res.ok) return
    const data = await res.json()
    const entry = data[props.product]
    if (entry) {
      versionText.value = entry.version
      versionStatus.value = entry.status ?? 'stable'
    }
  } catch {
    // silently fail
  }
})
</script>

<style>
.plat-badge {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
}
.plat-badge.stable {
  background: rgba(34, 197, 94, 0.12);
  color: #22c55e;
}
.plat-badge.beta {
  background: rgba(234, 179, 8, 0.12);
  color: #eab308;
}
.plat-badge.dev {
  background: rgba(59, 130, 246, 0.12);
  color: #3b82f6;
}
</style>
