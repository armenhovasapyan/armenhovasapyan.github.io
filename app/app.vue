<script setup lang="ts">
import { profile } from '~/data/site'

useHead({
  title: `${profile.name} — ${profile.role}`,
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
