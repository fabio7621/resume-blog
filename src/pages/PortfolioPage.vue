<script setup>
import SectionHeading from '../components/SectionHeading.vue'
import ProjectCard from '../components/ProjectCard.vue'

const projects = [
  {
    name: 'HelmentShop',
    description:
      '安全帽電商網站前後台，Vue 3 Options API + Vite + Pinia + Router，串接 RESTful API。',
    tags: ['Vue 3', 'Vite', 'Pinia', 'RESTful API'],
    repo: 'https://github.com/fabio7621/HelmentShop',
    link: 'https://fabio7621.github.io/HelmentShop/#/',
  },
  {
    name: 'MusicShop',
    description:
      'React.js + Vite + chart.js 打造的音樂商店與儀錶板，練習資料視覺化與商品列表互動。',
    tags: ['React', 'Vite', 'chart.js'],
    repo: 'https://github.com/fabio7621/musicstore-react',
    link: 'https://fabio7621.github.io/musicstore-react/',
  },
  {
    name: '大東洋（靜態切版）',
    description:
      '服務案例 — 企業官網靜態切版，著重 RWD 與版面細節處理。',
    tags: ['HTML', 'CSS'],
    repo: '',
    link: 'https://www.freshlife.com.tw/',
  },
  {
    name: '蔡教練',
    description:
      '服務案例 — 教練個人形象網站靜態切版，含 RWD 排版。',
    tags: ['HTML', 'CSS'],
    repo: 'https://github.com/fabio7621/tsai-coach',
    link: 'https://fabio7621.github.io/tsai-coach/',
  },
]
</script>

<template>
  <section class="page-container py-16 md:py-24">
    <p
      class="font-mono text-sm"
      :style="{ color: 'var(--color-muted)' }"
    >
      <span :style="{ color: 'var(--color-accent)' }">$</span> ls ./projects
    </p>
    <h1 class="mt-3 text-4xl">Portfolio</h1>
    <p
      class="mt-3 max-w-2xl text-base"
      :style="{ color: 'var(--color-muted)' }"
    >
      把做過、正在做的專案放在這。每張卡可以連到 repo 或 live demo。
      日後會持續更新，希望越來越有工程師的味道。
    </p>

    <div class="mt-12">
      <SectionHeading
        title="works"
        subtitle="精選專案"
      />
      <div class="grid gap-6 md:grid-cols-2">
        <ProjectCard
          v-for="project in projects"
          :key="project.name"
          :name="project.name"
          :description="project.description"
          :tags="project.tags"
          :repo="project.repo"
          :link="project.link"
        />
      </div>
    </div>
  </section>
</template>
