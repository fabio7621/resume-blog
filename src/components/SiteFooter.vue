<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="mt-24"
    :style="{ borderTop: '1px solid var(--color-border)' }"
  >
    <div
      class="page-container flex flex-col items-center justify-between gap-3 py-6 font-mono text-xs sm:flex-row"
      :style="{ color: 'var(--color-muted)' }"
    >
      <p>
        <span :style="{ color: 'var(--color-accent)' }">$</span>
        echo &quot;© {{ year }} 李承哲 Fabio&quot;
      </p>
      <div class="flex items-center gap-4">
        <a
          href="https://github.com/fabio7621"
          target="_blank"
          rel="noopener noreferrer"
          >github</a
        >
        <a href="mailto:d6200121a@gmail.com">email</a>
        <span>built with Vue 3 · Vite · Tailwind</span>
      </div>
    </div>
  </footer>
</template>
