<script setup>
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import SinglePage from './pages/SinglePage.vue'
import ParticleBackground from './components/ParticleBackground.vue'
</script>

<template>
  <ParticleBackground />
  <div class="relative z-10 flex min-h-screen flex-col">
    <NavBar />
    <main class="flex-1">
      <SinglePage />
    </main>
    <SiteFooter />
  </div>
</template>
