<script setup lang="ts">
import { cvExperience } from '~/data/site'
</script>

<template>
  <section class="mb-10">
    <h2 class="text-xl font-bold text-accent mb-6">Professional Experience</h2>
    <ol class="space-y-8">
      <li
        v-for="job in cvExperience"
        :key="job.company + job.period"
        class="p-6 rounded-2xl bg-surface-2/60 border border-border"
      >
        <header
          class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3"
        >
          <p class="text-lg font-semibold text-fg">
            {{ job.company }}
            <span class="text-fg-muted font-normal">— {{ job.role }}</span>
          </p>
          <p class="text-sm text-fg-muted shrink-0">{{ job.period }}</p>
        </header>
        <p class="mb-3 text-sm text-fg-dim">{{ job.location }}</p>

        <div v-if="job.projects?.length" class="mb-4 space-y-3">
          <div
            v-for="proj in job.projects"
            :key="proj.name"
            class="rounded-xl bg-surface-3/60 border border-border/70 p-4"
          >
            <p class="text-sm font-semibold text-fg">
              {{ proj.name }}
              <span class="text-fg-dim font-normal">· {{ proj.country }}</span>
              <a
                v-if="proj.url"
                :href="proj.url"
                target="_blank"
                rel="noopener"
                class="ml-2 text-accent hover:text-accent-bright text-xs"
              >
                {{ proj.url.replace(/^https?:\/\/(www\.)?/, '') }}
              </a>
            </p>
            <ul class="mt-2 flex flex-wrap gap-1.5">
              <li
                v-for="tech in proj.technologies"
                :key="tech"
                class="px-2 py-0.5 rounded-full bg-surface-2 border border-border text-[11px] text-fg-muted"
              >
                {{ tech }}
              </li>
            </ul>
          </div>
        </div>

        <p
          v-if="job.architecturalPatterns"
          class="mb-1 text-sm text-fg-muted"
        >
          <span class="font-semibold text-fg">Architecture:</span>
          {{ job.architecturalPatterns }}
        </p>
        <p v-if="job.methodologies" class="mb-1 text-sm text-fg-muted">
          <span class="font-semibold text-fg">Methodologies:</span>
          {{ job.methodologies }}
        </p>
        <p v-if="job.designPrinciples" class="mb-3 text-sm text-fg-muted">
          <span class="font-semibold text-fg">Design patterns & principles:</span>
          {{ job.designPrinciples }}
        </p>

        <ul
          class="space-y-2 list-disc pl-5 marker:text-accent text-fg-muted text-sm leading-relaxed"
        >
          <li v-for="ach in job.achievements" :key="ach">{{ ach }}</li>
        </ul>
        <p v-if="job.technologies" class="mt-4 text-xs leading-relaxed text-fg">
          <span class="font-bold uppercase tracking-wider text-accent text-xs mr-1">
            Stack:
          </span>
          <span class="font-semibold">{{ job.technologies }}</span>
        </p>
      </li>
    </ol>
  </section>
</template>
