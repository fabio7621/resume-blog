<script setup>
import SectionHeading from '../components/SectionHeading.vue'
import PostCard from '../components/PostCard.vue'
import { usePosts } from '../composables/usePosts'
import { IRONMAN_SERIES } from '../content/series'

const { posts } = usePosts()
</script>

<template>
  <section class="page-container py-16 md:py-24">
    <p class="font-mono text-sm" :style="{ color: 'var(--color-muted)' }">
      <span :style="{ color: 'var(--color-accent)' }">$</span> ls ./blog
    </p>
    <h1 class="mt-3 text-4xl">Blog</h1>
    <p
      class="mt-3 max-w-2xl text-base"
      :style="{ color: 'var(--color-muted)' }"
    >
      技術筆記與鐵人賽系列文，同步自 iThome。
    </p>

    <div class="mt-12">
      <SectionHeading
        :title="IRONMAN_SERIES.event"
        :subtitle="IRONMAN_SERIES.title"
      />
      <p
        class="-mt-2 mb-4 max-w-2xl text-sm leading-relaxed"
        :style="{ color: 'var(--color-muted)' }"
      >
        {{ IRONMAN_SERIES.description }}
      </p>
      <a
        :href="IRONMAN_SERIES.url"
        target="_blank"
        rel="noopener noreferrer"
        class="font-mono text-sm"
      >
        &gt; 在 iThome 看完整系列（{{ posts.length }} 篇）
      </a>

      <ol class="mt-8 grid gap-4">
        <li v-for="post in posts" :key="post.slug">
          <PostCard
            :slug="post.slug"
            :subtitle="post.subtitle"
            :day="post.day"
            :date="post.date"
            :excerpt="post.excerpt"
          />
        </li>
      </ol>
    </div>
  </section>
</template>
