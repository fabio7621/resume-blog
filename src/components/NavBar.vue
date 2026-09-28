<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'

const links = [
  { to: { path: '/', hash: '#home' }, label: 'home' },
  { to: { path: '/', hash: '#about' }, label: 'about' },
  { to: { path: '/', hash: '#skills' }, label: 'skills' },
  { to: { path: '/', hash: '#portfolio' }, label: 'portfolio' },
  { to: { name: 'blog' }, label: 'blog' },
  { to: { path: '/', hash: '#contact' }, label: 'contact' },
]

const route = useRoute()
const menuOpen = ref(false)

const isActive = (link) => link.to.name === 'blog' && route.path.startsWith('/blog')

// 已在首頁且 hash 沒變時 router 不會觸發導航，手動捲到該區塊
function handleNavClick(link) {
  menuOpen.value = false
  if (link.to.hash && route.path === '/' && route.hash === link.to.hash) {
    document.querySelector(link.to.hash)?.scrollIntoView({ behavior: 'smooth' })
  }
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
      <RouterLink
        :to="links[0].to"
        class="font-mono text-sm font-semibold"
        :style="{ color: 'var(--color-text)' }"
        @click="handleNavClick(links[0])"
      >
        <span :style="{ color: 'var(--color-accent)' }">~/</span>fabio
      </RouterLink>

      <nav class="hidden items-center gap-1 md:flex">
        <RouterLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="nav-link rounded-md px-3 py-1.5 font-mono text-sm transition-colors"
          :style="{
            color: isActive(link) ? 'var(--color-accent)' : 'var(--color-muted)',
          }"
          @click="handleNavClick(link)"
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
          :key="link.label"
          :to="link.to"
          class="nav-link rounded-md px-3 py-2 font-mono text-sm"
          :style="{
            color: isActive(link) ? 'var(--color-accent)' : 'var(--color-muted)',
          }"
          @click="handleNavClick(link)"
        >
          <span aria-hidden="true">&gt; </span>{{ link.label }}
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav-link:hover {
  color: var(--color-accent) !important;
}
</style>
