<script setup lang="ts">
import ContactSection from '~/components/sections/cv/ContactSection.vue'
import EducationSection from '~/components/sections/cv/EducationSection.vue'
import ExperienceSection from '~/components/sections/cv/ExperienceSection.vue'
import HeroSection from '~/components/sections/cv/HeroSection.vue'
import LanguagesSection from '~/components/sections/cv/LanguagesSection.vue'
import SkilsSection from '~/components/sections/cv/SkilsSection.vue'
import SummarySection from '~/components/sections/cv/SummarySection.vue'
import { profile } from '~/data/site'

useSeoMeta({
  title: `CV — ${profile.name}`,
  description: `Curriculum vitae of ${profile.name}, ${profile.subRole}: professional experience, technical skills, education, and languages.`,
  ogTitle: `${profile.name} — CV`,
  ogDescription: profile.subRole,
  twitterCard: 'summary',
  robots: 'index, follow',
})

useHead({
  titleTemplate: (title) => title ?? profile.name,
  link: [{ rel: 'canonical', href: `${profile.siteUrl}/cv` }],
})

</script>

<template>
  <article class="pt-28 pb-16">
    <div class="container-page max-w-4xl">
      <HeroSection />
      <SummarySection />
      <ExperienceSection />
      <SkilsSection />
      <EducationSection />
      <LanguagesSection />
      <ContactSection />
    </div>
  </article>
</template>
