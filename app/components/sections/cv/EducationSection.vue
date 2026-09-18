<script setup lang="ts">
import { education } from '~/data/site'
</script>

<template>
  <section class="mb-10">
    <h2 class="text-xl font-bold text-accent mb-4">Education</h2>
    <ol class="space-y-3">
      <li
        v-for="edu in education"
        :key="edu.period"
        class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 p-4 rounded-xl bg-surface-2/60 border border-border"
      >
        <span class="text-fg">
          {{ edu.name }} — <span class="text-fg-muted">{{ edu.degree }}</span>
        </span>
        <span class="text-sm text-fg-muted shrink-0">{{ edu.period }}</span>
      </li>
    </ol>
  </section>
</template>
