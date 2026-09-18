<script setup lang="ts">
import { companies } from '~/data/site'
import SectionHeading from '~/components/ui/SectionHeading.vue'
import CompanyCard from '~/components/ui/CompanyCard.vue'
</script>

<template>
  <section
    id="experience"
    class="relative py-14 md:py-20 bg-surface/40 border-y border-border/40"
    aria-labelledby="experience-heading"
  >
    <div class="container-page">
      <SectionHeading
        eyebrow="Career History"
        title="Professional Experience"
        subtitle="A decade of delivering production software for healthcare, iGaming, and agency teams — from hands-on engineering to technical leadership."
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CompanyCard
          v-for="company in companies"
          :key="company.id"
          :company="company"
          :current="company.dateTo === 'Present'"
        />
      </div>
    </div>
  </section>
</template>
