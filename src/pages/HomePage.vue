<script setup>
import { RouterLink } from 'vue-router'
import TagBadge from '../components/TagBadge.vue'
import SectionHeading from '../components/SectionHeading.vue'

const topSkills = ['Vue 3', 'React', 'SCSS', 'Tailwind', 'Bootstrap 5']
</script>

<template>
  <section class="page-container py-16 md:py-24">
    <p
      class="font-mono text-sm"
      :style="{ color: 'var(--color-muted)' }"
    >
      <span :style="{ color: 'var(--color-accent)' }">$</span> whoami
    </p>
    <h1 class="mt-3 text-4xl leading-tight sm:text-5xl">
      Fabio · 李承哲
    </h1>
    <p
      class="mt-3 font-mono text-sm"
      :style="{ color: 'var(--color-accent)' }"
    >
      前端開發者 · 台灣
    </p>
    <p
      class="mt-4 max-w-2xl text-lg italic leading-relaxed"
      :style="{ color: 'var(--color-muted)' }"
    >
      「我用程式碼打造網頁體驗，偶爾也擲個骰子。」
    </p>

    <div class="mt-8 flex flex-wrap gap-3">
      <RouterLink
        to="/portfolio"
        class="inline-flex items-center gap-2 rounded-md px-4 py-2 font-mono text-sm transition-colors"
        :style="{
          border: '1px solid var(--color-accent)',
          color: 'var(--color-bg)',
          backgroundColor: 'var(--color-accent)',
        }"
      >
        <span aria-hidden="true">▸</span> view works
      </RouterLink>
      <RouterLink
        to="/about"
        class="inline-flex items-center gap-2 rounded-md px-4 py-2 font-mono text-sm transition-colors"
        :style="{
          border: '1px solid var(--color-border)',
          color: 'var(--color-text)',
          backgroundColor: 'var(--color-surface)',
        }"
      >
        <span aria-hidden="true">&gt;</span> about me
      </RouterLink>
    </div>

    <div class="mt-16">
      <SectionHeading
        title="status"
        subtitle="近況更新"
      />
      <div
        class="overflow-hidden rounded-xl font-mono text-sm"
        :style="{
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
        }"
      >
        <div
          class="flex items-center gap-2 px-4 py-2"
          :style="{
            borderBottom: '1px solid var(--color-border)',
            color: 'var(--color-muted)',
          }"
        >
          <span
            class="inline-block h-2.5 w-2.5 rounded-full"
            style="background:#ef4444"
          />
          <span
            class="inline-block h-2.5 w-2.5 rounded-full"
            style="background:#eab308"
          />
          <span
            class="inline-block h-2.5 w-2.5 rounded-full"
            style="background:#22c55e"
          />
          <span class="ml-2">~/fabio — bash</span>
        </div>
        <div class="space-y-2 px-4 py-4">
          <p>
            <span :style="{ color: 'var(--color-accent)' }">$</span>
            cat focus.txt
          </p>
          <p :style="{ color: 'var(--color-muted)' }">
            · 在好想工作室重新打磨基本功，學習 3A Pattern 與測試寫法
          </p>
          <p :style="{ color: 'var(--color-muted)' }">
            · 研究 SOLID 原則，閱讀《Code Complete》
          </p>
          <p :style="{ color: 'var(--color-muted)' }">
            · 練習把 AI 工具加入開發流程（先寫規格再實作）
          </p>
          <p>
            <span :style="{ color: 'var(--color-accent)' }">$</span>
            cat job-status.txt
          </p>
          <p :style="{ color: 'var(--color-muted)' }">
            · 求職暫緩中，但也不排斥被截胡帶走 — 歡迎聯絡
          </p>
        </div>
      </div>
    </div>

    <div class="mt-12">
      <SectionHeading
        title="stack"
        subtitle="常用工具"
      />
      <div class="flex flex-wrap gap-2">
        <TagBadge
          v-for="skill in topSkills"
          :key="skill"
          :label="skill"
        />
      </div>
      <p
        class="mt-4 font-mono text-xs"
        :style="{ color: 'var(--color-muted)' }"
      >
        &gt; 完整技能列表請見
        <RouterLink
          to="/skills"
          class="font-mono"
        >
          /skills
        </RouterLink>
      </p>
    </div>
  </section>
</template>
