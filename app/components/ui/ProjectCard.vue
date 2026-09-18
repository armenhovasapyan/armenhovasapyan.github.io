<script setup lang="ts">
import type { Project } from '~/types/site'

const props = defineProps<{ project: Project }>()
defineEmits<{ open: [] }>()

const { mode } = useTheme()

const logoSrc = computed(() => {
  const dark = props.project.logoDark
  const light = props.project.logoLight ?? dark
  if (!dark) return null
  return mode.value === 'light' ? (light ?? dark) : dark
})
</script>

<template>
  <article
    class="group relative flex flex-col overflow-hidden rounded-2xl bg-surface-2 border border-border hover:border-accent/50 transition-all duration-300"
  >
    <div
      class="relative flex items-center justify-between gap-4 p-6 bg-gradient-to-br from-accent/10 via-transparent to-transparent"
    >
      <template v-if="logoSrc">
        <div
          class="flex items-center justify-center w-24 h-14 rounded-xl bg-surface-2/80 border border-border px-3"
        >
          <img
            :src="logoSrc"
            :alt="`${project.name} logo`"
            width="80"
            height="40"
            loading="lazy"
            decoding="async"
            class="max-h-9 max-w-[76px] object-contain rounded-md transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </template>
      <div
        v-else
        class="flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/15 border border-accent/25 text-accent font-bold text-2xl shrink-0"
        aria-hidden="true"
      >
        {{ project.name.slice(0, 1) }}
      </div>
      <div class="text-right">
        <p class="text-xs font-semibold uppercase tracking-wider text-accent">
          {{ project.type }}
        </p>
        <p v-if="project.domain" class="mt-1 text-sm text-fg-muted">
          {{ project.domain }}
        </p>
      </div>
    </div>

    <div class="flex flex-col flex-1 p-6 pt-2">
      <h3 class="text-lg font-semibold text-fg leading-snug">
        {{ project.name }}
      </h3>
      <p class="mt-1 text-xs text-fg-dim">{{ project.location }}</p>
      <p class="mt-3 text-sm text-fg-muted leading-relaxed flex-1">
        {{ project.description }}
      </p>

      <ul class="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
        <li
          v-for="tech in project.technologies.slice(0, 8)"
          :key="tech"
          class="px-2.5 py-1 rounded-full bg-surface-3/80 border border-border text-xs text-fg-muted"
        >
          {{ tech }}
        </li>
        <li
          v-if="project.technologies.length > 8"
          class="px-2.5 py-1 rounded-full bg-surface-3/80 border border-border text-xs text-fg-dim"
        >
          +{{ project.technologies.length - 8 }} more
        </li>
      </ul>
    </div>

    <a
      v-if="project.url"
      :href="project.url"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-6 py-4 border-t border-border text-sm font-semibold text-accent hover:bg-accent/5 transition-colors"
    >
      Visit site
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
        aria-hidden="true"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </a>
  </article>
</template>
