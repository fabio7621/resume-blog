<script setup>
import SectionHeading from "../components/SectionHeading.vue";
import TagBadge from "../components/TagBadge.vue";
import ProjectGrid from "../components/ProjectGrid.vue";
import { useProjectGallery } from "../composables/useProjectGallery";
import {
  PERSONAL_PROJECTS,
  FEATURED_AI_PROJECTS,
  AI_SHOWCASE_PROJECTS,
} from "../content/projects";
import avatarUrl from "../assets/avatar.jpg";

useProjectGallery();

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

// 自己寫的 Claude Code Skill
const authoredSkill = {
  name: "code-complete-design",
  tagline: "寫給 AI 的 JavaScript 程式碼設計規範",
  repo: "https://github.com/fabio7621/code-complete-design",
  reason:
    "AI 產出的程式碼常常「能跑，但讀起來很差」。我把《Code Complete》第 7、10、14 章的" +
    "命名、函式職責、變數與程式碼組織原則整理成 Claude Code 的 Skill，" +
    "讓它在動手前先讀規範，而不是產出之後再靠 review 補救。",
};

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
        我是承哲，設計科系畢業後轉職前端，目前主要開發技術是 Vue 3 與 React。
        在行銷公司擔任前端的兩年半期間，獨立完成多個企業官網的切版與功能實作，
        也負責維護與修復公司既有的舊專案。
      </p>
      <p>
        設計背景是我在前端工作上的優勢。從 Amos 的網頁切版班開始，
        我養成的習慣是理解每個 CSS 屬性的行為，而不是靠試錯堆出結果，
        這讓我在還原設計稿與處理複雜版面時，知道自己每一行為什麼這樣寫。
      </p>
      <p>
        在切版這塊，AI 目前還是有明顯不足，版面一複雜，產出的間距、對齊與 RWD
        斷點往往需要人工重修，反覆修正也會耗費多餘的時間與 token。
        過去兩年半的切版經驗讓我在處理複雜版面時更有條理， 能避免 AI
        協作產出多餘的程式碼，而不是一再丟回去讓它重試。 閱讀《Code
        Complete》後，我開始關注程式的內聚力、命名與可維護性，
        並整理成一套自己的開發規範。
      </p>
      <p>
        2025 年 12 月起，我在好想工作室 Web Camp 擔任進駐學員。
        即使部分內容過去接觸過，我仍選擇從基礎重新建立，這次補強的不只是語法，
        還包括測試撰寫、I/O 設計這些過去實務中沒機會深入的工程觀念，
        以及拆解問題的流程。
      </p>
      <p>
        我也曾參與台南市衛生局菸酒業務單位的流程優化專案，
        實地訪談承辦人員釐清作業痛點，產出 prototype 並參與提案，
        協助把使用者需求轉化為具體的系統設計方向。對我來說，寫程式是手段，
        找到真正的問題並解決它才是價值所在。
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

    <div class="mt-12">
      <SectionHeading
        title="authored skill"
        subtitle="我寫的 Claude Code Skill"
      />
      <a
        :href="authoredSkill.repo"
        target="_blank"
        rel="noopener noreferrer"
        class="skill-card block rounded-xl p-5 transition-colors"
        :style="{
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
        }"
      >
        <p class="font-mono text-sm">
          <span :style="{ color: 'var(--color-accent)' }"
            >~/.claude/skills/</span
          >{{ authoredSkill.name }}
        </p>
        <p class="mt-2 text-base">{{ authoredSkill.tagline }}</p>
        <p
          class="mt-3 text-sm leading-relaxed"
          :style="{ color: 'var(--color-muted)' }"
        >
          {{ authoredSkill.reason }}
        </p>
        <p
          class="mt-4 font-mono text-xs"
          :style="{ color: 'var(--color-muted)' }"
        >
          &gt; view on github
        </p>
      </a>
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
      <SectionHeading title="works" subtitle="個人專案" />
      <ProjectGrid :projects="PERSONAL_PROJECTS" />
    </div>

    <div class="mt-16">
      <SectionHeading title="ai-assisted" subtitle="AI 協作專案" />
      <p
        class="-mt-2 mb-6 max-w-2xl text-sm leading-relaxed"
        :style="{ color: 'var(--color-muted)' }"
      >
        先寫規格再交給 AI 實作，由我負責拆需求、定規則與驗收。
      </p>
      <ProjectGrid :projects="FEATURED_AI_PROJECTS" />

      <RouterLink
        :to="{ name: 'ai-works' }"
        class="mt-8 inline-flex items-center gap-2 rounded-md px-4 py-2 font-mono text-sm transition-colors"
        :style="{
          border: '1px solid var(--color-accent)',
          color: 'var(--color-accent)',
          backgroundColor: 'var(--color-surface)',
        }"
      >
        <span aria-hidden="true">▸</span>
        更多 AI 協作視覺作品（{{ AI_SHOWCASE_PROJECTS.length }}）
      </RouterLink>
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

.skill-card:hover {
  border-color: var(--color-accent) !important;
}
</style>
