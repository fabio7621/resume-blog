<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'

const links = [
  { to: '/', label: 'home' },
  { to: '/about', label: 'about' },
  { to: '/skills', label: 'skills' },
  { to: '/portfolio', label: 'portfolio' },
]

const menuOpen = ref(false)

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header
    class="sticky top-0 z-40 backdrop-blur"
    :style="{
      borderBottom: '1px solid var(--color-border)',
      backgroundColor: 'color-mix(in srgb, var(--color-bg) 85%, transparent)',
    }"
  >
    <div
      class="page-container flex h-14 items-center justify-between gap-4"
    >
      <RouterLink
        to="/"
        class="font-mono text-sm font-semibold"
        :style="{ color: 'var(--color-text)' }"
        @click="closeMenu"
      >
        <span :style="{ color: 'var(--color-accent)' }">~/</span>fabio
      </RouterLink>

      <nav class="hidden items-center gap-1 md:flex">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-md px-3 py-1.5 font-mono text-sm transition-colors"
          :style="{ color: 'var(--color-muted)' }"
          active-class="nav-link-active"
        >
          <span aria-hidden="true">&gt; </span>{{ link.label }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-2">
        <ThemeToggle />
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-md border font-mono md:hidden"
          :style="{
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)',
            backgroundColor: 'var(--color-surface)',
          }"
          :aria-label="menuOpen ? '關閉選單' : '開啟選單'"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          {{ menuOpen ? '×' : '≡' }}
        </button>
      </div>
    </div>

    <nav
      v-if="menuOpen"
      class="md:hidden"
      :style="{ borderTop: '1px solid var(--color-border)' }"
    >
      <div class="page-container flex flex-col py-2">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-md px-3 py-2 font-mono text-sm"
          :style="{ color: 'var(--color-muted)' }"
          active-class="nav-link-active"
          @click="closeMenu"
        >
          <span aria-hidden="true">&gt; </span>{{ link.label }}
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav-link-active {
  color: var(--color-accent) !important;
  background-color: var(--color-accent-soft);
}
</style>
