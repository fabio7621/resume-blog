<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePosts } from '../composables/usePosts'
import { useMarkdown } from '../composables/useMarkdown'

const route = useRoute()
const { posts, getPostIndex } = usePosts()
const { render } = useMarkdown()

const postIndex = computed(() => getPostIndex(route.params.slug))
const post = computed(() => posts[postIndex.value] ?? null)
const html = computed(() => (post.value ? render(post.value.body) : ''))
const prevPost = computed(() => posts[postIndex.value - 1] ?? null)
const nextPost = computed(() =>
  postIndex.value >= 0 ? (posts[postIndex.value + 1] ?? null) : null,
)
</script>

<template>
  <article v-if="post" class="page-container py-16 md:py-24">
    <RouterLink :to="{ name: 'blog' }" class="font-mono text-sm">
      &lt; cd ../blog
    </RouterLink>

    <header
      class="mt-8 pb-8"
      :style="{ borderBottom: '1px solid var(--color-border)' }"
    >
      <p
        class="flex flex-wrap items-center gap-3 font-mono text-xs"
        :style="{ color: 'var(--color-muted)' }"
      >
        <span
          v-if="post.day !== null"
          class="rounded-md px-2 py-0.5"
          :style="{
            color: 'var(--color-accent)',
            backgroundColor: 'var(--color-accent-soft)',
          }"
        >
          Day {{ String(post.day).padStart(2, '0') }}
        </span>
        <time :datetime="post.date">{{ post.date }}</time>
      </p>
      <h1 class="mt-4 text-2xl leading-snug sm:text-3xl">{{ post.subtitle }}</h1>
      <a
        v-if="post.source"
        :href="post.source"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-4 inline-block font-mono text-xs"
      >
        &gt; 原文發表於 iThome 鐵人賽
      </a>
    </header>

    <!-- 內容來自自己 repo 裡的 Markdown，非使用者輸入 -->
    <div class="post-content mt-8" v-html="html" />

    <nav
      class="mt-16 grid gap-4 pt-8 sm:grid-cols-2"
      :style="{ borderTop: '1px solid var(--color-border)' }"
    >
      <RouterLink
        v-if="prevPost"
        :to="{ name: 'post', params: { slug: prevPost.slug } }"
        class="post-nav flex flex-col gap-1 rounded-xl p-4"
        :style="{ border: '1px solid var(--color-border)' }"
      >
        <span class="font-mono text-xs" :style="{ color: 'var(--color-muted)' }">
          &lt; 上一篇
        </span>
        <span class="text-sm" :style="{ color: 'var(--color-text)' }">
          {{ prevPost.subtitle }}
        </span>
      </RouterLink>
      <RouterLink
        v-if="nextPost"
        :to="{ name: 'post', params: { slug: nextPost.slug } }"
        class="post-nav flex flex-col gap-1 rounded-xl p-4 text-right sm:col-start-2"
        :style="{ border: '1px solid var(--color-border)' }"
      >
        <span class="font-mono text-xs" :style="{ color: 'var(--color-muted)' }">
          下一篇 &gt;
        </span>
        <span class="text-sm" :style="{ color: 'var(--color-text)' }">
          {{ nextPost.subtitle }}
        </span>
      </RouterLink>
    </nav>
  </article>

  <section v-else class="page-container py-24 text-center">
    <p class="font-mono text-sm" :style="{ color: 'var(--color-muted)' }">
      <span :style="{ color: 'var(--color-accent)' }">404</span> 找不到這篇文章
    </p>
    <RouterLink :to="{ name: 'blog' }" class="mt-4 inline-block font-mono text-sm">
      &lt; 回文章列表
    </RouterLink>
  </section>
</template>

<style scoped>
.post-nav:hover {
  border-color: var(--color-accent) !important;
}
</style>
