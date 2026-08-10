<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import SectionHeading from "../components/SectionHeading.vue";
import TagBadge from "../components/TagBadge.vue";
import ProjectCard from "../components/ProjectCard.vue";
import avatarUrl from "../assets/avatar.jpg";

const FANCYBOX_SELECTOR = "[data-fancybox='portfolio']";

onMounted(() => {
  Fancybox.bind(FANCYBOX_SELECTOR, {
    // 跟著站上的 light / dark 切換走
    theme: () =>
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    Carousel: { infinite: false },
  });
});

onBeforeUnmount(() => {
  Fancybox.unbind(FANCYBOX_SELECTOR);
  Fancybox.close();
});

// 專案預覽圖：把圖片丟進 src/assets/projects/，再把檔名填到下面 projects 的 image 欄位
const projectImages = import.meta.glob(
  "../assets/projects/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    import: "default",
  },
);

const getProjectImage = (fileName) =>
  fileName ? (projectImages[`../assets/projects/${fileName}`] ?? "") : "";

const topSkills = [
  "JavaScript (ES6+)",
  "Vue 3",
  "React",
  "SCSS",
  "Tailwind",
  "Bootstrap 5",
];

// 求職狀態：職位 / 到職時間 / 地點 / 想找的團隊，四行以內講完
const jobStatus = [
  "目前開放前端工程師職缺（Vue 3 / React）",
  "可到職時間：隨時",
  "工作地點：台南／可遠端",
  "有興趣的方向：產品型前端、需要設計與實作整合的團隊",
];

const timeline = [
  {
    year: "2025.12 – 至今",
    title: "Web Camp 進駐學員",
    org: "好想工作室",
    details: [
      "調整學習方式，建立「觀察 → 假設 → 驗證」的解題流程",
      "學習 3A Pattern、測試撰寫與 I/O 設計觀念",
      "研讀 SOLID 原則與《Code Complete》，並實踐於個人專案重構",
      "建立 AI-assisted development 流程：先寫規格再實作",
    ],
  },
  {
    year: "2023 – 2025.12",
    title: "前端工程師 / 設計師",
    org: "佑新行銷股份有限公司",
    details: [
      // TODO：把「多個」換成實際數字（例：獨立負責 12 個官網、平均 2 週交付）
      "獨立負責多個企業官網前端切版，從設計稿到上線全流程，與 PM、後端協作交付",
      "接手無文件的舊專案進行維護與修復，梳理既有結構並補上可維護的樣式架構，降低後續改版成本",
      "擔任產品 PM 與外包後端之間的技術窗口，協助釐清 API 規格與需求變更，減少需求來回確認的次數",
    ],
  },
  {
    year: "2019 – 2023",
    title: "行銷美編",
    org: "格力得企業有限公司",
    details: [
      "負責網拍商品主視覺與行銷素材設計，產出可直接上架的版面",
      "商品頁面版面規劃與影像處理（Photoshop / Illustrator）",
    ],
  },
];

const skillGroups = [
  {
    title: "frontend",
    desc: "我的主場",
    items: [
      "JavaScript (ES6+)",
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
    desc: "協作範圍",
    items: ["Node.js / Express", "RESTful API 設計", "MongoDB / Mongoose"],
  },
  {
    title: "design",
    desc: "設計背景延伸",
    items: ["Figma", "Photoshop", "Illustrator", "RWD 版面規劃"],
  },
  {
    title: "tools",
    desc: "日常工具",
    items: ["Git / GitHub", "Vite", "Claude Code", "AI-assisted development"],
  },
];

// TODO：若有 LinkedIn / CakeResume，補進這個陣列即可
const contactChannels = [
  {
    label: "email",
    value: "d6200121a@gmail.com",
    href: "mailto:d6200121a@gmail.com",
    external: false,
  },
  {
    label: "github",
    value: "github.com/fabio7621",
    href: "https://github.com/fabio7621",
    external: true,
  },
];

// 排序原則：實務性質的專案在前，課程作業型往後
// TODO：duration 請填上實際起訖月份；highlight 請確認與當時的技術決策相符
const projects = [
  {
    name: "衛生局稽查流程優化（提案專案）",
    description:
      "實地訪談台南市衛生局菸酒業務單位，釐清現行紙本派案流程的痛點，" +
      "產出流程圖與可操作 prototype 並參與提案，將使用者需求轉譯為系統設計方向。",
    role: "需求訪談 / 流程設計 / 原型製作",
    duration: "",
    highlight:
      "使用單位講的是「表單很難填」，實際卡點是派案與回報分屬兩套流程；先畫流程圖對齊認知，再用 prototype 讓對方在畫面上確認，需求才收斂得下來。",
    tags: ["需求訪談", "流程設計", "Prototype", "Vue 3"],
    repo: "",
    link: "https://fabio7621.github.io/tabacoco/#/",
    image: "tabacoco.png",
  },
  {
    name: "大東洋（企業官網切版）",
    description: "服務案例 — 企業官網靜態切版，著重 RWD 與版面細節處理。",
    role: "獨立負責前端切版",
    duration: "",
    highlight:
      "首頁的鮮活報報,不使用JS利用CSS的position的z-index前後圖層關係，讓每個選單在hover時能顯示各自相對應的圖片。",
    tags: ["HTML", "CSS", "RWD"],
    repo: "",
    link: "https://www.freshlife.com.tw/",
    image: "don.png",
  },
  {
    name: "蔡教練",
    description: "服務案例 — 教練個人形象網站靜態切版，含 RWD 排版。",
    role: "獨立負責前端切版",
    duration: "",
    highlight:
      "以形象頁為主的單頁結構，把版面拆成可重複套用的區塊，讓後續增減段落不用重寫樣式。",
    tags: ["HTML", "CSS", "RWD"],
    repo: "https://github.com/fabio7621/tsai-coach",
    link: "https://fabio7621.github.io/tsai-coach/",
    image: "ten.png",
  },
  {
    name: "HelmentShop",
    description:
      "安全帽電商網站前後台，Vue 3 Options API + Vite + Pinia + Router，串接 RESTful API。",
    role: "獨立開發",
    duration: "",
    highlight:
      "購物車狀態要在商品頁、結帳頁與後台之間同步，用 props 傳遞會讓路由層層耦合，改以 Pinia 集中管理並統一處理 API 失敗時的回滾。",
    tags: ["Vue 3", "Vite", "Pinia", "RESTful API"],
    repo: "https://github.com/fabio7621/HelmentShop",
    link: "https://fabio7621.github.io/HelmentShop/#/",
    image: "helment.png",
  },
  {
    name: "MusicShop",
    description:
      "React.js + Vite + chart.js 打造的音樂商店與儀錶板，練習資料視覺化與商品列表互動。",
    role: "獨立開發",
    duration: "",
    highlight:
      "chart.js 在資料更新時會整張重繪，改為只更新 dataset 並控制重新渲染的時機，避免切換分類時畫面卡頓。",
    tags: ["React", "Vite", "chart.js"],
    repo: "https://github.com/fabio7621/musicstore-react",
    link: "https://fabio7621.github.io/musicstore-react/",
    image: "music.png",
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
          前端工程師 · Vue 3 / React · 設計背景轉職
        </p>
        <p
          class="mt-4 max-w-2xl text-base leading-relaxed"
          :style="{ color: 'var(--color-muted)' }"
        >
          兩年半企業官網切版實務，能從設計稿一路做到上線；現正尋找前端工程師職缺。
        </p>
        <!-- <p
          class="mt-4 max-w-2xl text-lg italic leading-relaxed"
          :style="{ color: 'var(--color-muted)' }"
        >
          「。」
        </p> -->

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
          <a
            href="#contact"
            class="inline-flex items-center gap-2 rounded-md px-4 py-2 font-mono text-sm transition-colors"
            :style="{
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              backgroundColor: 'var(--color-surface)',
            }"
          >
            <span aria-hidden="true">@</span> contact
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
          <p
            v-for="line in jobStatus"
            :key="line"
            :style="{ color: 'var(--color-muted)' }"
          >
            · {{ line }}
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
        我畢業於設計相關科系，轉職投入前端開發。設計背景讓我拿到設計稿時，
        能直接判斷間距、層級與斷點該怎麼落地；在還沒有設計稿的階段，
        也能自己把版面規劃出來，減少與設計端來回確認的成本。
      </p>
      <p>
        我從 Amos（CSScoke）老師的網頁切版班開始打基礎， 養成理解每個 CSS
        屬性特性再下手的習慣。過去兩年半的切版實務， 讓我在使用 AI
        工具時能判斷哪些產出可以直接用、哪些必須自己重寫——
        現在的做法是先把需求與資料流寫成規格，再依規格實作與審查，
        讓問題停在規格階段，而不是等到程式碼裡才發現。 從 2025 年 12
        月起，我在好想工作室 Web Camp
        補上過去實務中沒機會深入的工程觀念與測試方法。
      </p>
      <p>
        閱讀《Code Complete》後，我開始留意程式的內聚力、命名與可維護性，
        也寫了一套自己的 skill，讓學習或實作時都能更有條理地拆解問題。
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
      以下為目前實際使用於專案的技術。
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
      持續更新中，每張卡皆可連至 repo 或 live demo。
    </p>

    <div class="mt-12">
      <SectionHeading title="works" subtitle="精選專案" />
      <div class="grid gap-6 md:grid-cols-2">
        <ProjectCard
          v-for="project in projects"
          :key="project.name"
          :name="project.name"
          :description="project.description"
          :role="project.role"
          :duration="project.duration"
          :highlight="project.highlight"
          :tags="project.tags"
          :repo="project.repo"
          :link="project.link"
          :image="getProjectImage(project.image)"
        />
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section
    id="contact"
    class="page-container py-16 md:py-24"
    :style="{ borderTop: '1px solid var(--color-border)' }"
  >
    <p class="font-mono text-sm" :style="{ color: 'var(--color-muted)' }">
      <span :style="{ color: 'var(--color-accent)' }">$</span> cat contact.txt
    </p>
    <h2 class="mt-3 text-4xl">Contact</h2>
    <p
      class="mt-3 max-w-2xl text-base"
      :style="{ color: 'var(--color-muted)' }"
    >
      目前開放前端工程師職缺，履歷、作品細節或合作邀約都歡迎直接來信。
    </p>

    <div class="mt-8 grid gap-4 sm:grid-cols-2">
      <a
        v-for="channel in contactChannels"
        :key="channel.label"
        :href="channel.href"
        :target="channel.external ? '_blank' : undefined"
        :rel="channel.external ? 'noopener noreferrer' : undefined"
        class="contact-card flex flex-col gap-1 rounded-xl p-5 transition-colors"
        :style="{
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
        }"
      >
        <span
          class="font-mono text-xs"
          :style="{ color: 'var(--color-muted)' }"
        >
          {{ channel.label }}
        </span>
        <span class="font-mono text-sm" :style="{ color: 'var(--color-text)' }">
          {{ channel.value }}
        </span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.contact-card:hover {
  border-color: var(--color-accent) !important;
}
</style>
