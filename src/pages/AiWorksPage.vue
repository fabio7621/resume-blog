<script setup>
import SectionHeading from '../components/SectionHeading.vue'
import ProjectGrid from '../components/ProjectGrid.vue'
import { useProjectGallery } from '../composables/useProjectGallery'
import { AI_SHOWCASE_PROJECTS } from '../content/projects'

useProjectGallery()
</script>

<template>
  <section class="page-container py-16 md:py-24">
    <RouterLink
      :to="{ path: '/', hash: '#portfolio' }"
      class="font-mono text-sm"
      :style="{ color: 'var(--color-muted)' }"
    >
      ← back to portfolio
    </RouterLink>

    <p class="mt-8 font-mono text-sm" :style="{ color: 'var(--color-muted)' }">
      <span :style="{ color: 'var(--color-accent)' }">$</span> ls ./ai-works
    </p>
    <h1 class="mt-3 text-4xl">AI 協作 · 視覺作品</h1>
    <p
      class="mt-3 max-w-2xl text-base"
      :style="{ color: 'var(--color-muted)' }"
    >
      偏重畫面表現的實驗作品：3D 場景、Shader、物理模擬與互動動畫。
      每個作品都可點圖放大，或連到 repo 與 live demo 實際操作。
    </p>

    <div class="mt-12">
      <SectionHeading title="showcase" :subtitle="`共 ${AI_SHOWCASE_PROJECTS.length} 個作品`" />
      <ProjectGrid :projects="AI_SHOWCASE_PROJECTS" />
    </div>
  </section>
</template>
