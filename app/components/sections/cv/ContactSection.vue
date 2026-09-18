<script setup lang="ts">
import { socials } from '~/data/site'
</script>

<template>
  <section>
    <h2 class="text-xl font-bold text-accent mb-4">Contact</h2>
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <li v-for="channel in socials" :key="channel.id">
        <a
          :href="channel.href"
          :target="channel.href.startsWith('http') ? '_blank' : undefined"
          :rel="channel.href.startsWith('http') ? 'noopener noreferrer' : undefined"
          class="group flex items-center gap-3.5 h-full p-4 rounded-2xl bg-surface-2/60 border border-border hover:border-accent/50 transition-colors"
        >
          <span
            class="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 border border-border group-hover:border-accent/40 transition-colors shrink-0"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              :fill="SOCIAL_FILLED.has(channel.id) ? 'currentColor' : 'none'"
              :stroke="SOCIAL_FILLED.has(channel.id) ? 'none' : 'currentColor'"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-5 h-5 text-accent"
            >
              <path :d="SOCIAL_ICONS[channel.id] ?? ''" />
            </svg>
          </span>
          <span class="min-w-0">
            <span
              class="block text-xs font-semibold uppercase tracking-wider text-fg-dim"
            >
              {{ channel.label }}
            </span>
            <span
              class="block mt-0.5 text-sm font-medium text-fg truncate group-hover:text-accent transition-colors"
            >
              {{ channel.display }}
            </span>
          </span>
        </a>
      </li>
    </ul>
  </section>
</template>
