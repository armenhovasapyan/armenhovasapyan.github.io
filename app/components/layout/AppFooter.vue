<script setup lang="ts">
import { profile } from '~/data/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="border-t border-border bg-surface"
    aria-labelledby="footer-heading"
    style="padding-bottom: env(safe-area-inset-bottom)"
  >
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div
      class="container-page py-8 sm:py-6 flex flex-col items-center gap-2 text-sm text-fg-muted text-center"
    >
      <p class="text-fg font-medium">
        {{ profile.name }}
      </p>
      <p>
        © {{ year }} · All rights reserved.
      </p>
    </div>
  </footer>
</template>
