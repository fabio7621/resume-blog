<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme.js'

const { theme, toggle } = useTheme()

const label = computed(() => (theme.value === 'dark' ? 'light' : 'dark'))
const ariaLabel = computed(
  () => `切換至 ${theme.value === 'dark' ? '淺色' : '深色'} 模式`,
)
</script>

<template>
  <button
    type="button"
    :aria-label="ariaLabel"
    class="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-sm transition-colors"
    :style="{
      borderColor: 'var(--color-border)',
      color: 'var(--color-text)',
      backgroundColor: 'var(--color-surface)',
    }"
    @click="toggle"
  >
    <span aria-hidden="true">{{ theme === 'dark' ? '◐' : '◑' }}</span>
    <span>{{ label }}</span>
  </button>
</template>
