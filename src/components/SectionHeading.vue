<script setup>
defineProps({
  title: { type: String, required: true },
  prefix: { type: String, default: '//' },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <header class="mb-6">
    <p
      class="font-mono text-xs"
      :style="{ color: 'var(--color-muted)' }"
    >
      <span :style="{ color: 'var(--color-accent)' }">{{ prefix }}</span>
      {{ title }}
    </p>
    <h2
      v-if="subtitle"
      class="mt-2 text-2xl sm:text-3xl"
    >
      {{ subtitle }}
    </h2>
  </header>
</template>
