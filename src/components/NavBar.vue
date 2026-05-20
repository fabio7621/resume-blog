<script setup>
import { ref } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const links = [
  { href: '#home', label: 'home' },
  { href: '#about', label: 'about' },
  { href: '#skills', label: 'skills' },
  { href: '#portfolio', label: 'portfolio' },
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
    <div class="page-container flex h-14 items-center justify-between gap-4">
      <a
        href="#home"
        class="font-mono text-sm font-semibold"
        :style="{ color: 'var(--color-text)' }"
        @click="closeMenu"
      >
        <span :style="{ color: 'var(--color-accent)' }">~/</span>fabio
      </a>

      <nav class="hidden items-center gap-1 md:flex">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="nav-link rounded-md px-3 py-1.5 font-mono text-sm transition-colors"
          :style="{ color: 'var(--color-muted)' }"
        >
          <span aria-hidden="true">&gt; </span>{{ link.label }}
        </a>
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
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="nav-link rounded-md px-3 py-2 font-mono text-sm"
          :style="{ color: 'var(--color-muted)' }"
          @click="closeMenu"
        >
          <span aria-hidden="true">&gt; </span>{{ link.label }}
        </a>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav-link:hover {
  color: var(--color-accent) !important;
}
</style>
