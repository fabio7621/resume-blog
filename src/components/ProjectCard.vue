<script setup>
import TagBadge from './TagBadge.vue'

defineProps({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: Array, default: () => [] },
  repo: { type: String, default: '' },
  link: { type: String, default: '' },
  image: { type: String, default: '' },
  // 同一組 gallery 的圖片在燈箱裡可以左右切換
  gallery: { type: String, default: 'portfolio' },
})
</script>

<template>
  <article
    class="project-card group flex flex-col overflow-hidden transition-colors"
    :style="{
      border: '1px solid var(--color-border)',
      borderRadius: '12px',
      backgroundColor: 'var(--color-surface)',
    }"
  >
    <!-- 專案預覽圖：固定 16:9，未放圖時顯示佔位框 -->
    <div
      class="relative w-full overflow-hidden"
      :style="{
        aspectRatio: '16 / 9',
        borderBottom: '1px solid var(--color-border)',
      }"
    >
      <a
        v-if="image"
        :href="image"
        :data-fancybox="gallery"
        :data-caption="name"
        class="block h-full w-full cursor-zoom-in"
        :aria-label="`放大檢視 ${name} 專案預覽`"
      >
        <img
          :src="image"
          :alt="`${name} 專案預覽`"
          loading="lazy"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </a>
      <div
        v-else
        class="flex h-full w-full flex-col items-center justify-center gap-1 font-mono text-xs"
        :style="{ color: 'var(--color-muted)' }"
      >
        <span aria-hidden="true">[ 16 : 9 ]</span>
        <span>no preview yet</span>
      </div>
    </div>

    <div class="flex flex-1 flex-col gap-4 p-6">
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
        class="mt-auto flex flex-wrap gap-2"
      >
        <TagBadge
          v-for="tag in tags"
          :key="tag"
          :label="tag"
        />
      </footer>
    </div>
  </article>
</template>

<style scoped>
.project-card:hover {
  border-color: var(--color-accent) !important;
}
</style>
