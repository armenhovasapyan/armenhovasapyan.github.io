<script setup lang="ts">
import type { Skill } from '~/types/site'

const MONO_ICONS = new Set([
  'apachekafka',
  'circleci',
  'symfony',
  'claude',
  'claudecode',
  'codex',
  'cursor',
  'elastic',
  'express',
  'githubcopilot',
  'jest',
  'linear',
  'n8n',
  'newrelic',
  'openai',
])

const props = defineProps<{ skill: Skill }>()

const iconClass = computed(() =>
  props.skill.icon && MONO_ICONS.has(props.skill.icon.split('/').pop()?.replace('.svg', '') ?? '')
    ? 'icon-mono'
    : '',
)
</script>

<template>
  <li
    class="group relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border bg-surface-3/80 border-border-strong/70 hover:border-accent/50 hover:bg-surface-3 transition-all duration-300"
  >
    <span
      class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-accent/10 to-transparent pointer-events-none"
      aria-hidden="true"
    />
    <span
      class="logo-chip relative flex items-center justify-center w-14 h-14 rounded-xl transition-transform duration-300 group-hover:scale-110"
    >
      <img
        v-if="skill.icon"
        :src="skill.icon"
        :alt="`${skill.title} logo`"
        width="44"
        height="44"
        loading="lazy"
        decoding="async"
        class="w-11 h-11 object-contain"
        :class="iconClass"
      />
      <span
        v-else
        class="flex items-center justify-center w-11 h-11 rounded-lg bg-accent/10 text-accent font-bold text-sm"
        aria-hidden="true"
      >
        {{ skill.title.slice(0, 2) }}
      </span>
    </span>
    <span class="text-sm font-medium text-fg text-center leading-snug">
      {{ skill.title }}
    </span>
  </li>
</template>
