<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="page-container py-24 text-center">
    <p
      class="font-mono text-sm"
      :style="{ color: 'var(--color-muted)' }"
    >
      $ status
    </p>
    <h1 class="mt-4 text-4xl">404 · not found</h1>
    <p
      class="mt-3"
      :style="{ color: 'var(--color-muted)' }"
    >
      這條路徑找不到對應的頁面。
    </p>
    <RouterLink
      to="/"
      class="mt-8 inline-block font-mono"
    >
      &gt; cd ~
    </RouterLink>
  </section>
</template>
