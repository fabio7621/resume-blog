<script setup>
import TagBadge from './TagBadge.vue'

defineProps({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: Array, default: () => [] },
  repo: { type: String, default: '' },
  link: { type: String, default: '' },
})
</script>

<template>
  <article
    class="project-card group flex flex-col gap-4 p-6 transition-colors"
    :style="{
      border: '1px solid var(--color-border)',
      borderRadius: '12px',
      backgroundColor: 'var(--color-surface)',
    }"
  >
    <header class="flex items-center justify-between gap-2">
      <h3 class="text-lg">
        <span
          aria-hidden="true"
          :style="{ color: 'var(--color-accent)' }"
          >▸</span
        >
        {{ name }}
      </h3>
      <div
        class="flex gap-2 font-mono text-xs"
        :style="{ color: 'var(--color-muted)' }"
      >
        <a
          v-if="repo"
          :href="repo"
          target="_blank"
          rel="noopener noreferrer"
        >
          repo
        </a>
        <a
          v-if="link"
          :href="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          live
        </a>
      </div>
    </header>
    <p
      class="text-sm leading-relaxed"
      :style="{ color: 'var(--color-muted)' }"
    >
      {{ description }}
    </p>
    <footer
      v-if="tags.length"
      class="flex flex-wrap gap-2"
    >
      <TagBadge
        v-for="tag in tags"
        :key="tag"
        :label="tag"
      />
    </footer>
  </article>
</template>

<style scoped>
.project-card:hover {
  border-color: var(--color-accent) !important;
}
</style>
