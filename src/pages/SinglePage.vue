<script setup>
import SectionHeading from '../components/SectionHeading.vue'
import TagBadge from '../components/TagBadge.vue'
import ProjectCard from '../components/ProjectCard.vue'
// 之後想換照片，把 avatar.svg 換成 avatar.jpg / .png 即可
import avatarUrl from '../assets/avatar.svg'

const topSkills = ['Vue 3', 'React', 'SCSS', 'Tailwind', 'Bootstrap 5']

const timeline = [
  {
    year: '2023 – 2025.12',
    title: '前端工程師 / 設計師',
    org: '佑新行銷股份有限公司',
    details: [
      '使用 Bootstrap 5 完成多個響應式企業網頁切版',
      '維護與救援公司舊專案',
      '擔任產品 PM 與外包後端之間的溝通橋樑',
    ],
  },
  {
    year: '2019 – 2023',
    title: '行銷美編',
    org: '格力得企業有限公司',
    details: ['網拍美編設計', '公司庶務管理'],
  },
]

const currentlyLearning = [
  '在好想工作室加強 JavaScript 與前端框架',
  '學習 3A Pattern、測試寫法、I/O 設計觀念',
  '研究 SOLID 原則並閱讀《Code Complete》',
  '練習 AI-assisted development：先寫規格再實作',
]

const skillGroups = [
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
    description: '服務案例 — 企業官網靜態切版，著重 RWD 與版面細節處理。',
    tags: ['HTML', 'CSS'],
    repo: '',
    link: 'https://www.freshlife.com.tw/',
  },
  {
    name: '蔡教練',
    description: '服務案例 — 教練個人形象網站靜態切版，含 RWD 排版。',
    tags: ['HTML', 'CSS'],
    repo: 'https://github.com/fabio7621/tsai-coach',
    link: 'https://fabio7621.github.io/tsai-coach/',
  },
]
</script>

<template>
  <!-- Hero -->
  <section
    id="home"
    class="page-container py-16 md:py-24"
  >
    <div class="grid items-center gap-8 md:grid-cols-[200px_1fr]">
      <!-- 大頭貼 -->
      <div class="flex justify-center md:justify-start">
        <img
          :src="avatarUrl"
          alt="Fabio 李承哲"
          class="h-40 w-40 rounded-full object-cover md:h-48 md:w-48"
          :style="{ border: '2px solid var(--color-border)' }"
        />
      </div>

      <!-- 文字資訊 -->
      <div>
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
          <a
            href="#portfolio"
            class="inline-flex items-center gap-2 rounded-md px-4 py-2 font-mono text-sm transition-colors"
            :style="{
              border: '1px solid var(--color-accent)',
              color: 'var(--color-bg)',
              backgroundColor: 'var(--color-accent)',
            }"
          >
            <span aria-hidden="true">▸</span> view works
          </a>
          <a
            href="#about"
            class="inline-flex items-center gap-2 rounded-md px-4 py-2 font-mono text-sm transition-colors"
            :style="{
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              backgroundColor: 'var(--color-surface)',
            }"
          >
            <span aria-hidden="true">&gt;</span> about me
          </a>
        </div>
      </div>
    </div>

    <!-- 近況狀態 -->
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
            style="background: #ef4444"
          />
          <span
            class="inline-block h-2.5 w-2.5 rounded-full"
            style="background: #eab308"
          />
          <span
            class="inline-block h-2.5 w-2.5 rounded-full"
            style="background: #22c55e"
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

    <!-- 常用 stack -->
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
        <a
          href="#skills"
          class="font-mono"
        >
          #skills
        </a>
      </p>
    </div>
  </section>

  <!-- About -->
  <section
    id="about"
    class="page-container py-16 md:py-24"
    :style="{ borderTop: '1px solid var(--color-border)' }"
  >
    <p
      class="font-mono text-sm"
      :style="{ color: 'var(--color-muted)' }"
    >
      <span :style="{ color: 'var(--color-accent)' }">$</span> cat about.md
    </p>
    <h2 class="mt-3 text-4xl">About me</h2>

    <div class="mt-8 space-y-4 text-base leading-relaxed">
      <p>
        設計相關科系畢業，後來轉職前端開發，把原本的視覺設計背景延伸到網頁實作。
        參加過 Amos（CSScoke）老師的課程後，從前端切版工作開始累積，
        熟悉版面細節與 RWD，框架方面會 Vue 與 React，具備基礎應用能力。
      </p>
      <p>
        現在持續在好想工作室學習，加強 JavaScript 與前端框架能力，
        也開始接觸測試、I/O 設計等軟體工程觀念，並透過《Code Complete》
        理解可讀性與可維護性的重要。最近也在練習把 AI 工具加入開發流程，
        先寫規格與計劃，再搭配 AI 實作小工具，思考從需求到完成的完整流程。
      </p>
      <p>
        日後作品會持續更新，希望能更有工程師的味道，
        不再只是補習班作品，而是學習與努力累積下來的結晶。
      </p>
    </div>

    <div class="mt-16">
      <SectionHeading
        title="experience"
        subtitle="工作經歷"
      />
      <ol class="space-y-8">
        <li
          v-for="item in timeline"
          :key="item.year"
          class="grid gap-2 sm:grid-cols-[180px_1fr] sm:gap-6"
        >
          <p
            class="font-mono text-sm"
            :style="{ color: 'var(--color-muted)' }"
          >
            {{ item.year }}
          </p>
          <div>
            <h3 class="text-lg">
              {{ item.title }}
              <span
                class="ml-1 font-mono text-sm"
                :style="{ color: 'var(--color-accent)' }"
                >@{{ item.org }}</span
              >
            </h3>
            <ul
              class="mt-2 space-y-1 text-sm leading-relaxed"
              :style="{ color: 'var(--color-muted)' }"
            >
              <li
                v-for="d in item.details"
                :key="d"
              >
                · {{ d }}
              </li>
            </ul>
          </div>
        </li>
      </ol>
    </div>

    <div class="mt-12">
      <SectionHeading
        title="currently"
        subtitle="目前在做的事"
      />
      <ul
        class="space-y-1 text-base leading-relaxed"
        :style="{ color: 'var(--color-muted)' }"
      >
        <li
          v-for="item in currentlyLearning"
          :key="item"
        >
          · {{ item }}
        </li>
      </ul>
    </div>
  </section>

  <!-- Skills -->
  <section
    id="skills"
    class="page-container py-16 md:py-24"
    :style="{ borderTop: '1px solid var(--color-border)' }"
  >
    <p
      class="font-mono text-sm"
      :style="{ color: 'var(--color-muted)' }"
    >
      <span :style="{ color: 'var(--color-accent)' }">$</span> ls ./skills
    </p>
    <h2 class="mt-3 text-4xl">Skills</h2>
    <p
      class="mt-3 max-w-2xl text-base"
      :style="{ color: 'var(--color-muted)' }"
    >
      把目前最常使用、最有信心的技能整理在這。沒列的不代表沒用過，只是還在練。
    </p>

    <div class="mt-12 space-y-12">
      <div
        v-for="group in skillGroups"
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

  <!-- Portfolio -->
  <section
    id="portfolio"
    class="page-container py-16 md:py-24"
    :style="{ borderTop: '1px solid var(--color-border)' }"
  >
    <p
      class="font-mono text-sm"
      :style="{ color: 'var(--color-muted)' }"
    >
      <span :style="{ color: 'var(--color-accent)' }">$</span> ls ./projects
    </p>
    <h2 class="mt-3 text-4xl">Portfolio</h2>
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
