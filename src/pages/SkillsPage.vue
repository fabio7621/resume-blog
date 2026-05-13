<script setup>
import SectionHeading from '../components/SectionHeading.vue'
import TagBadge from '../components/TagBadge.vue'

const groups = [
  {
    title: 'frontend',
    desc: '我的主場',
    items: [
      'Vue 3 (Composition API / script setup / Pinia)',
      'React',
      'HTML5',
      'CSS3 / SCSS',
      'Tailwind CSS',
      'Bootstrap 5',
    ],
  },
  {
    title: 'backend',
    desc: '略懂、能配合溝通',
    items: ['Node.js / Express', 'RESTful API 設計', 'MongoDB / Mongoose'],
  },
  {
    title: 'tools',
    desc: '日常工具',
    items: ['Git / GitHub', 'Vite', 'Claude Code', 'AI-assisted development'],
  },
]
</script>

<template>
  <section class="page-container py-16 md:py-24">
    <p
      class="font-mono text-sm"
      :style="{ color: 'var(--color-muted)' }"
    >
      <span :style="{ color: 'var(--color-accent)' }">$</span> ls ./skills
    </p>
    <h1 class="mt-3 text-4xl">Skills</h1>
    <p
      class="mt-3 max-w-2xl text-base"
      :style="{ color: 'var(--color-muted)' }"
    >
      把目前最常使用、最有信心的技能整理在這。沒列的不代表沒用過，只是還在練。
    </p>

    <div class="mt-12 space-y-12">
      <div
        v-for="group in groups"
        :key="group.title"
      >
        <SectionHeading
          :title="group.title"
          :subtitle="group.desc"
        />
        <div class="flex flex-wrap gap-2">
          <TagBadge
            v-for="item in group.items"
            :key="item"
            :label="item"
          />
        </div>
      </div>
    </div>
  </section>
</template>
