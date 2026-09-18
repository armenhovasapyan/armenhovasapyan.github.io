<script setup lang="ts">
import { summary, summaryBody } from '~/data/site'
const { position } = usePosition()

const bodyLines = computed(() => summaryBody(position.value.id))
</script>

<template>
  <section class="mb-10">
    <h2 class="text-xl font-bold text-accent mb-4">Professional Summary</h2>
    <p class="text-fg leading-relaxed mb-3">{{ summary.intro }}</p>
    <p
      v-for="line in bodyLines"
      :key="line"
      class="text-fg-muted leading-relaxed mb-3"
    >
      {{ line }}
    </p>
    <ul class="mt-4 space-y-2 list-disc pl-6 marker:text-accent text-fg-muted">
      <li v-for="point in summary.highlights" :key="point">{{ point }}</li>
    </ul>
  </section>
</template>
