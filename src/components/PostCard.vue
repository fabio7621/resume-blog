<script setup>
defineProps({
  slug: { type: String, required: true },
  subtitle: { type: String, required: true },
  day: { type: Number, default: null },
  date: { type: String, default: '' },
  excerpt: { type: String, default: '' },
})
</script>

<template>
  <RouterLink
    :to="{ name: 'post', params: { slug } }"
    class="post-card flex flex-col gap-2 rounded-xl p-5 transition-colors"
    :style="{
      border: '1px solid var(--color-border)',
      backgroundColor: 'var(--color-surface)',
    }"
  >
    <div
      class="flex items-center gap-3 font-mono text-xs"
      :style="{ color: 'var(--color-muted)' }"
    >
      <span
        v-if="day !== null"
        class="rounded-md px-2 py-0.5"
        :style="{
          color: 'var(--color-accent)',
          backgroundColor: 'var(--color-accent-soft)',
        }"
      >
        Day {{ String(day).padStart(2, '0') }}
      </span>
      <time :datetime="date">{{ date }}</time>
    </div>
    <h3 class="text-base leading-snug sm:text-lg">{{ subtitle }}</h3>
    <p
      v-if="excerpt"
      class="line-clamp-2 text-sm leading-relaxed"
      :style="{ color: 'var(--color-muted)' }"
    >
      {{ excerpt }}
    </p>
  </RouterLink>
</template>

<style scoped>
.post-card:hover {
  border-color: var(--color-accent) !important;
}
</style>
