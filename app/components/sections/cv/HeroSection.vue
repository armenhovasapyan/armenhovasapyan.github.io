<script setup lang="ts">
import { profile } from '~/data/site'
const { position } = usePosition()
</script>

<template>
  <header class="text-center mb-12">
    <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
      {{ profile.name }}
    </h1>
    <p class="mt-2 text-lg text-fg-muted">{{ profile.subRole }}</p>
    <p class="mt-2 text-lg text-fg-muted">{{ position.headline }}</p>

    <ul
      class="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-fg-muted"
    >
      <li>
        <a
          :href="`mailto:${profile.email}`"
          class="hover:text-accent transition-colors"
        >
          {{ profile.email }}
        </a>
      </li>
      <li v-for="p in profile.phones" :key="p">
        <a
          :href="`tel:${p.replace(/\s|-/g, '')}`"
          class="hover:text-accent transition-colors"
        >
          {{ p }}
        </a>
      </li>
      <li>{{ profile.location }}</li>
    </ul>

    <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
      <a
        :href="position.pdf"
        download
        target="_blank"
        rel="noopener"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-on-accent text-sm font-semibold hover:bg-accent-bright transition-colors cursor-pointer"
      >
        Download PDF
      </a>
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-2 text-fg text-sm font-semibold border border-border hover:border-accent/50 transition-colors cursor-pointer"
      >
        ← Back to portfolio
      </NuxtLink>
    </div>
  </header>
</template>
