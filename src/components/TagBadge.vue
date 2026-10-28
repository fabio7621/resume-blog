<script setup>
defineProps({
  label: { type: String, required: true },
  highlight: { type: Boolean, default: false },
  // sm：作品卡片內使用的小號標籤
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['md', 'sm'].includes(value),
  },
})
</script>

<template>
  <span
    class="inline-flex items-center font-mono transition-colors"
    :class="size === 'sm' ? 'text-card-meta' : 'text-sm'"
    :style="{
      padding: size === 'sm' ? '2px 8px' : '4px 10px',
      borderRadius: '6px',
      border: '1px solid var(--color-border)',
      color: highlight ? 'var(--color-accent)' : 'var(--color-text)',
      backgroundColor: highlight
        ? 'var(--color-accent-soft)'
        : 'var(--color-surface)',
    }"
  >
    <span
      aria-hidden="true"
      :style="{ color: 'var(--color-muted)', marginRight: '4px' }"
      >[</span
    >{{ label
    }}<span
      aria-hidden="true"
      :style="{ color: 'var(--color-muted)', marginLeft: '4px' }"
      >]</span
    >
  </span>
</template>
