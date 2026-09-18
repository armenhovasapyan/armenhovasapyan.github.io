<script setup lang="ts">
import { languages } from '~/data/site'
</script>

<template>
  <section class="mb-10">
    <h2 class="text-xl font-bold text-accent mb-4">Languages</h2>
    <ul class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <li
        v-for="lang in languages"
        :key="lang.id"
        class="p-3 rounded-xl bg-surface-2/60 border border-border"
      >
        <span class="text-fg">
          {{ lang.name }}
          <span class="text-fg-muted text-sm">· {{ lang.level }}</span>
        </span>
      </li>
    </ul>
  </section>  
</template>
