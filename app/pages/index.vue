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

const { position } = usePosition()

// The whole document head is position-aware: the meta description,
// og:description, the `alternate` PDF link, and the Person JSON-LD all
// re-evaluate when the visitor switches position, so the head mirrors the
// visible page. useSeoMeta takes per-field getters (which patch meta tags);
// useHead gets the getter form, which is what makes links and scripts reactive.
useSeoMeta({
  title: `${profile.name} — ${profile.role}`,
  description: () =>
    `${profile.name}, ${profile.role} in ${profile.location}: ${yearsOfExperience()}+ years designing and delivering scalable web applications and backend systems with ${position.value.summarySkills.join(', ')}.`,
  ogTitle: `${profile.name} — ${profile.role}`,
  ogDescription: () =>
    `Lead Software Engineer specializing in ${position.value.headline} — scalable backend systems and full-stack web applications.`,
  ogType: 'profile',
  ogImage: `${profile.siteUrl}/og-image.png`,
  ogImageAlt: `${profile.name} — ${profile.role}`,
  twitterCard: 'summary_large_image',
  twitterTitle: profile.name,
  twitterDescription: profile.role,
  twitterImage: `${profile.siteUrl}/og-image.png`,
})

useHead(() => ({
  titleTemplate: (title) => title ?? profile.name,
  link: [
    { rel: 'canonical', href: `${profile.siteUrl}/` },
    {
      // Explicit key: when the position changes, unhead updates this tag in
      // place instead of appending a second <link> with a different href.
      key: 'cv-pdf',
      rel: 'alternate',
      type: 'application/pdf',
      href: `${profile.siteUrl}${position.value.pdf}`,
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      key: 'ld-person',
      // `knowsAbout` leads with the selected position's stack, so structured
      // data matches the emphasis a visitor sees on screen.
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        jobTitle: profile.role,
        description: `Lead Software Engineer with ${yearsOfExperience()}+ years designing, building, and maintaining scalable web applications and backend systems with ${position.value.summarySkills.join(', ')}.`,
        email: `mailto:${profile.email}`,
        telephone: profile.phones[0],
        url: `${profile.siteUrl}/`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: profile.location,
        },
        knowsAbout: [
          ...position.value.summarySkills,
          ...skills
            .map((s) => s.title)
            .filter((t) => !position.value.summarySkills.includes(t)),
        ],
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
      key: 'ld-projects',
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
}))
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