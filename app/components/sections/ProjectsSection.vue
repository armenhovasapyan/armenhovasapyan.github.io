<script setup lang="ts">
import { projects } from '~/data/site'
import SectionHeading from '~/components/ui/SectionHeading.vue'
import ProjectCard from '~/components/ui/ProjectCard.vue'
</script>

<template>
  <section id="projects" class="py-14 md:py-20" aria-labelledby="projects-heading">
    <div class="container-page">
      <SectionHeading
        eyebrow="Case Studies"
        title="Projects"
        subtitle="Production platforms I helped design, build, and lead — spanning high-traffic iGaming services and healthcare marketplaces."
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard v-for="p in projects" :key="p.id" :project="p" />

        <NuxtLink
          to="/cv"
          class="group flex flex-col items-center justify-center gap-3 min-h-[280px] rounded-2xl border-2 border-dashed border-border hover:border-accent/60 bg-surface/30 hover:bg-accent/5 transition-all duration-300"
        >
          <span
            class="flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/25 text-accent text-2xl font-bold transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
          <span class="text-base font-semibold text-fg transition-colors group-hover:text-accent">
            CV
          </span>
          <span class="text-sm text-fg-muted text-center max-w-[24ch]">
            Additional agency and web projects in the detailed CV
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
