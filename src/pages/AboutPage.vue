<script setup>
import SectionHeading from '../components/SectionHeading.vue'

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
</script>

<template>
  <section class="page-container py-16 md:py-24">
    <p
      class="font-mono text-sm"
      :style="{ color: 'var(--color-muted)' }"
    >
      <span :style="{ color: 'var(--color-accent)' }">$</span> cat about.md
    </p>
    <h1 class="mt-3 text-4xl">About me</h1>

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

    <div class="mt-12">
      <SectionHeading
        title="status"
        subtitle="目前狀態"
      />
      <p class="text-base">
        尋找前端開發者職位中（台灣 / 遠端皆可）。
      </p>
    </div>
  </section>
</template>
