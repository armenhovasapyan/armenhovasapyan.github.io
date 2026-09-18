<script setup lang="ts">
import type { Company } from '~/types/site'

const props = defineProps<{ company: Company; current?: boolean }>()

const { mode } = useTheme()

const logoSrc = computed(() => {
  const dark = props.company.logoDark
  const light = props.company.logoLight ?? dark
  if (!dark) return null
  return mode.value === 'light' ? (light ?? dark) : dark
})

const monogram = computed(() => {
  if (props.company.monogram) return props.company.monogram
  const name = props.company.name
  const isSingleWord = !name.trim().includes(' ')
  return {
    text: (
      isSingleWord
        ? name.slice(0, 2)
        : name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('')
    ).toUpperCase(),
    color: '#10b981',
  }
})
</script>

<template>
  <article
    class="relative flex flex-col items-center justify-between gap-4 p-6 rounded-2xl bg-surface-2/60 border border-border hover:border-accent/40 transition-all duration-300 group"
  >
    <span
      v-if="current"
      class="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-accent/15 text-accent border border-accent/30"
    >
      <span
        class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
        aria-hidden="true"
      />
      Present
    </span>
    <template v-if="logoSrc">
      <div class="logo-chip flex items-center justify-center h-24 w-full px-5 rounded-xl">
        <img
          :src="logoSrc"
          :alt="`${company.name} logo`"
          width="160"
          height="96"
          loading="lazy"
          decoding="async"
          class="max-h-16 max-w-[150px] object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </template>
    <div
      v-else
      class="flex items-center justify-center h-24 w-full rounded-xl"
      :style="{ backgroundColor: `${monogram.color}1f`, borderColor: `${monogram.color}4d` }"
      aria-hidden="true"
    >
      <span
        class="flex items-center justify-center w-14 h-14 rounded-2xl font-bold text-xl tracking-wide"
        :style="{ backgroundColor: `${monogram.color}2e`, color: monogram.color, border: `1px solid ${monogram.color}59` }"
      >
        {{ monogram.text }}
      </span>
    </div>
    <div class="text-center">
      <p class="font-semibold text-fg">{{ company.name }}</p>
      <p class="text-xs text-fg-dim mt-0.5">{{ company.role }}</p>
      <p class="text-xs text-fg-muted mt-2">
        {{ company.dateFrom }} – {{ company.dateTo }}
      </p>
    </div>
  </article>
</template>
