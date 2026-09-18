<script setup lang="ts">
import {
  companies,
  languages,
  profile,
  projects,
  skills,
  yearsOfExperience,
} from '~/data/site'
import HeroSection from '~/components/sections/main/HeroSection.vue'
import SkillsSection from '~/components/sections/main/SkillsSection.vue'
import ExperienceSection from '~/components/sections/main/ExperienceSection.vue'
import ProjectsSection from '~/components/sections/main/ProjectsSection.vue'
import ContactSection from '~/components/sections/main/ContactSection.vue'

useSeoMeta({
  title: `${profile.name} — ${profile.role}`,
  description: () =>
    `${profile.name}, ${profile.role} in ${profile.location}: ${yearsOfExperience()} years designing and delivering scalable web applications and backend systems with .NET, PHP, Node.js, and Python.`,
  ogTitle: `${profile.name} — ${profile.role}`,
  ogDescription:
    'Software Engineer specializing in scalable backend systems and full-stack web applications — .NET, PHP, Node.js, and Python.',
  ogType: 'profile',
  twitterCard: 'summary',
  twitterTitle: profile.name,
  twitterDescription: profile.role,
})

useHead({
  titleTemplate: (title) => title ?? profile.name,
  link: [
    { rel: 'canonical', href: `${profile.siteUrl}/` },
    {
      rel: 'alternate',
      type: 'application/pdf',
      href: `${profile.siteUrl}${profile.cvPdf}`,
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        jobTitle: profile.role,
        description:
          `Software Engineer with ${yearsOfExperience()} years designing, building, and maintaining scalable web applications and backend systems.`,
        email: `mailto:${profile.email}`,
        telephone: profile.phones[0],
        url: `${profile.siteUrl}/`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: profile.location,
        },
        knowsAbout: skills.map((s) => s.title),
        knowsLanguage: languages.map((l) => l.name),
        worksFor: {
          '@type': 'Organization',
          name: companies[0]?.name,
        },
        alumniOf: companies.map((c) => ({
          '@type': 'Organization',
          name: c.name,
        })),
        sameAs: [profile.linkedin, profile.github],
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: projects.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'CreativeWork',
            name: p.name,
            description: p.description,
            url: p.url ?? `${profile.siteUrl}/#projects`,
          },
        })),
      }),
    },
  ],
})
</script>

<template>
  <article>
    <HeroSection />
    <SkillsSection />
    <ExperienceSection />
    <ProjectsSection />
    <ContactSection />
  </article>
</template>
