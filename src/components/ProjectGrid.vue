<script setup>
import ProjectCard from './ProjectCard.vue'
import { getProjectImage } from '../composables/useProjectGallery'

defineProps({
  projects: { type: Array, default: () => [] },
})
</script>

<template>
  <div class="grid gap-6 md:grid-cols-2">
    <ProjectCard
      v-for="project in projects"
      :key="project.name"
      :name="project.name"
      :description="project.description"
      :role="project.role"
      :duration="project.duration"
      :highlight="project.highlight"
      :tags="project.tags"
      :repo="project.repo"
      :link="project.link"
      :image="getProjectImage(project.image)"
    />
  </div>
</template>
