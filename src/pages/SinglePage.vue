<script setup>
import SectionHeading from "../components/SectionHeading.vue";
import TagBadge from "../components/TagBadge.vue";
import ProjectCard from "../components/ProjectCard.vue";
import avatarUrl from "../assets/avatar.jpg";

const topSkills = ["Vue 3", "React", "SCSS", "Tailwind", "Bootstrap 5"];

const timeline = [
  {
    year: "2023 – 2025.12",
    title: "前端工程師 / 設計師",
    org: "佑新行銷股份有限公司",
    details: [
      "使用 Bootstrap 5 完成多個響應式企業網頁切版",
      "維護與救援公司舊專案",
      "擔任產品 PM 與外包後端之間的溝通橋樑",
    ],
  },
  {
    year: "2019 – 2023",
    title: "行銷美編",
    org: "格力得企業有限公司",
    details: ["網拍美編設計", "公司庶務管理"],
  },
];

const currentlyLearning = [
  "在好想工作室加強 JavaScript 與前端框架",
  "學習 3A Pattern、測試寫法、I/O 設計觀念",
  "研究 SOLID 原則並閱讀《Code Complete》",
  "練習 AI-assisted development：先寫規格再實作",
];

const skillGroups = [
  {
    title: "frontend",
    desc: "我的主場",
    items: [
      "Vue 3 (Composition API / script setup / Pinia)",
      "React",
      "HTML5",
      "CSS3 / SCSS",
      "Tailwind CSS",
      "Bootstrap 5",
    ],
  },
  {
    title: "backend",
    desc: "略懂、能配合溝通",
    items: ["Node.js / Express", "RESTful API 設計", "MongoDB / Mongoose"],
  },
  {
    title: "tools",
    desc: "日常工具",
    items: ["Git / GitHub", "Vite", "Claude Code", "AI-assisted development"],
  },
];

const projects = [
  {
    name: "HelmentShop",
    description:
      "安全帽電商網站前後台，Vue 3 Options API + Vite + Pinia + Router，串接 RESTful API。",
    tags: ["Vue 3", "Vite", "Pinia", "RESTful API"],
    repo: "https://github.com/fabio7621/HelmentShop",
    link: "https://fabio7621.github.io/HelmentShop/#/",
  },
  {
    name: "MusicShop",
    description:
      "React.js + Vite + chart.js 打造的音樂商店與儀錶板，練習資料視覺化與商品列表互動。",
    tags: ["React", "Vite", "chart.js"],
    repo: "https://github.com/fabio7621/musicstore-react",
    link: "https://fabio7621.github.io/musicstore-react/",
  },
  {
    name: "大東洋（靜態切版）",
    description: "服務案例 — 企業官網靜態切版，著重 RWD 與版面細節處理。",
    tags: ["HTML", "CSS"],
    repo: "",
    link: "https://www.freshlife.com.tw/",
  },
  {
    name: "蔡教練",
    description: "服務案例 — 教練個人形象網站靜態切版，含 RWD 排版。",
    tags: ["HTML", "CSS"],
    repo: "https://github.com/fabio7621/tsai-coach",
    link: "https://fabio7621.github.io/tsai-coach/",
  },
];
</script>

<template>
  <!-- Hero -->
  <section id="home" class="page-container py-16 md:py-24">
    <div class="grid items-center gap-8 md:grid-cols-[200px_1fr]">
      <!-- 大頭貼 -->
      <div class="flex justify-center md:justify-start">
        <img
          :src="avatarUrl"
          alt="李承哲"
          class="h-40 w-40 rounded-full object-cover md:h-48 md:w-48"
          :style="{ border: '2px solid var(--color-border)' }"
        />
      </div>

      <!-- 文字資訊 -->
      <div>
        <p class="font-mono text-sm" :style="{ color: 'var(--color-muted)' }">
          <span :style="{ color: 'var(--color-accent)' }">$</span> whoami
        </p>
        <h1 class="mt-3 text-4xl leading-tight sm:text-5xl">李承哲</h1>
        <p
          class="mt-3 font-mono text-sm"
          :style="{ color: 'var(--color-accent)' }"
        >
          前端開發
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
      <SectionHeading title="status" subtitle="近況更新" />
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
            · 您好，我是承哲，曾在行銷公司擔任前端切版工作兩年半
          </p>
          <p :style="{ color: 'var(--color-muted)' }">
            · 參與多項企業官網專案，熟悉 HTML、CSS、Bootstrap，並具備 Vue 與
            React 基礎應用能力
          </p>
          <p :style="{ color: 'var(--color-muted)' }">
            · 目前是好想工作室 Web Camp
            進駐學員，持續練習程式、解決問題與學習方法
          </p>
          <p>
            <span :style="{ color: 'var(--color-accent)' }">$</span>
            cat job-status.txt
          </p>
          <p :style="{ color: 'var(--color-muted)' }">
            · 相信在 AI 高速發展的時代，除了寫程式，更重要的是找到痛點並解決問題
          </p>
        </div>
      </div>
    </div>

    <!-- 常用 stack -->
    <div class="mt-12">
      <SectionHeading title="stack" subtitle="常用工具" />
      <div class="flex flex-wrap gap-2">
        <TagBadge v-for="skill in topSkills" :key="skill" :label="skill" />
      </div>
      <p
        class="mt-4 font-mono text-xs"
        :style="{ color: 'var(--color-muted)' }"
      >
        &gt; 完整技能列表請見
        <a href="#skills" class="font-mono"> #skills </a>
      </p>
    </div>
  </section>

  <!-- About -->
  <section
    id="about"
    class="page-container py-16 md:py-24"
    :style="{ borderTop: '1px solid var(--color-border)' }"
  >
    <p class="font-mono text-sm" :style="{ color: 'var(--color-muted)' }">
      <span :style="{ color: 'var(--color-accent)' }">$</span> cat about.md
    </p>
    <h2 class="mt-3 text-4xl">About me</h2>

    <div class="mt-8 space-y-4 text-base leading-relaxed">
      <p>
        我畢業於設計相關科系，過去曾在不同領域工作，之後決定轉職投入前端開發。
        因為弟弟本身是後端工程師，他建議我可以從 UI 相關方向開始嘗試前端，
        也讓我有機會延續原本的設計背景，把視覺設計與網頁實作結合起來。
      </p>
      <p>
        在大大小小的學習過程中，我從 Amos（CSScoke）老師的網頁切版班開始打基礎，
        學會必須理解每個 CSS 屬性的特性，才能在實作中真正知道自己在做什麼。
        雖然現在 Claude Design 等 AI
        工具已經很強，但遇到細節複雜的網頁時還不能做到最完美，
        過去兩年半的切版與實務經驗，讓我更能判斷如何駕馭 AI，而不是被 AI 駕馭。
        從去年 12 月到現在，我也在好想工作室 Web Camp
        持續學習。即使很多內容曾經接觸過，
        我仍選擇重新來過，學的不只是程式本身，也包括學習方式與解決問題的流程。
      </p>
      <p>
        最近我也嘗試把 AI 工具加入自己的開發流程。過去閱讀《Code Complete》時，
        我開始注意程式的內聚力、命名與可維護性，也寫了一套自己的 skill，
        幫助未來不論是學習或實作，都能更有條理地拆解問題。
        先前也曾參與台南市衛生局菸酒單位的流程優化專案，
        透過親訪使用單位了解痛點、製作 prototype 並參與提案，
        協助將使用者需求轉化為具體的系統設計方向。
      </p>
    </div>

    <div class="mt-16">
      <SectionHeading title="experience" subtitle="工作經歷" />
      <ol class="space-y-8">
        <li
          v-for="item in timeline"
          :key="item.year"
          class="grid gap-2 sm:grid-cols-[180px_1fr] sm:gap-6"
        >
          <p class="font-mono text-sm" :style="{ color: 'var(--color-muted)' }">
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
              <li v-for="d in item.details" :key="d">· {{ d }}</li>
            </ul>
          </div>
        </li>
      </ol>
    </div>

    <div class="mt-12">
      <SectionHeading title="currently" subtitle="目前在做的事" />
      <ul
        class="space-y-1 text-base leading-relaxed"
        :style="{ color: 'var(--color-muted)' }"
      >
        <li v-for="item in currentlyLearning" :key="item">· {{ item }}</li>
      </ul>
    </div>
  </section>

  <!-- Skills -->
  <section
    id="skills"
    class="page-container py-16 md:py-24"
    :style="{ borderTop: '1px solid var(--color-border)' }"
  >
    <p class="font-mono text-sm" :style="{ color: 'var(--color-muted)' }">
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
      <div v-for="group in skillGroups" :key="group.title">
        <SectionHeading :title="group.title" :subtitle="group.desc" />
        <div class="flex flex-wrap gap-2">
          <TagBadge v-for="item in group.items" :key="item" :label="item" />
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
    <p class="font-mono text-sm" :style="{ color: 'var(--color-muted)' }">
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
      <SectionHeading title="works" subtitle="精選專案" />
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
