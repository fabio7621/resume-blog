<script setup>
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import SinglePage from './pages/SinglePage.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <NavBar />
    <main class="flex-1">
      <SinglePage />
    </main>
    <SiteFooter />
  </div>
</template>
