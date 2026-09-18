<script setup lang="ts">
import {
  cvExperience,
  education,
  languages,
  profile,
  skills,
  skillGroupLabels,
  socials,
  summary,
  summaryBody,
} from '~/data/site'
import { SOCIAL_ICONS, SOCIAL_FILLED } from '~/utils/social-icons'

const { position } = usePosition()

// Skill groups reordered for the selected position; the position's lead
// skills float to the front of their group.
const leadRank = computed(() => new Map(position.value.leadSkills.map((id, i) => [id, i])))

const bodyLines = computed(() => summaryBody(position.value.id))

const groupedSkills = computed(() =>
  position.value.groupOrder
    .map((group) => {
      const items = skills
        .filter((s) => s.group === group)
        .sort((a, b) => {
          const la = leadRank.value.has(a.id) ? leadRank.value.get(a.id)! : 99
          const lb = leadRank.value.has(b.id) ? leadRank.value.get(b.id)! : 99
          return la - lb
        })
      return { label: skillGroupLabels[group], items }
    })
    .filter((g) => g.items.length > 0),
)

const MONO_ICONS = new Set([
  'apachekafka',
  'circleci',
  'symfony',
  'claude',
  'claudecode',
  'codex',
  'cursor',
  'elastic',
  'express',
  'githubcopilot',
  'jest',
  'linear',
  'n8n',
  'newrelic',
  'openai',
])

const iconClass = (icon?: string) =>
  icon && MONO_ICONS.has(icon.split('/').pop()?.replace('.svg', '') ?? '')
    ? 'icon-mono'
    : ''

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
      <header class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
          {{ profile.name }}
        </h1>
        <p class="mt-2 text-lg text-fg-muted">{{ profile.subRole }}</p>

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

      <section class="mb-10">
        <h2 class="text-xl font-bold text-accent mb-6">Professional Experience</h2>
        <ol class="space-y-8">
          <li
            v-for="job in cvExperience"
            :key="job.company + job.period"
            class="p-6 rounded-2xl bg-surface-2/60 border border-border"
          >
            <header
              class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3"
            >
              <p class="text-lg font-semibold text-fg">
                {{ job.company }}
                <span class="text-fg-muted font-normal">— {{ job.role }}</span>
              </p>
              <p class="text-sm text-fg-muted shrink-0">{{ job.period }}</p>
            </header>
            <p class="mb-3 text-sm text-fg-dim">{{ job.location }}</p>

            <div v-if="job.projects?.length" class="mb-4 space-y-3">
              <div
                v-for="proj in job.projects"
                :key="proj.name"
                class="rounded-xl bg-surface-3/60 border border-border/70 p-4"
              >
                <p class="text-sm font-semibold text-fg">
                  {{ proj.name }}
                  <span class="text-fg-dim font-normal">· {{ proj.country }}</span>
                  <a
                    v-if="proj.url"
                    :href="proj.url"
                    target="_blank"
                    rel="noopener"
                    class="ml-2 text-accent hover:text-accent-bright text-xs"
                  >
                    {{ proj.url.replace(/^https?:\/\/(www\.)?/, '') }}
                  </a>
                </p>
                <ul class="mt-2 flex flex-wrap gap-1.5">
                  <li
                    v-for="tech in proj.technologies"
                    :key="tech"
                    class="px-2 py-0.5 rounded-full bg-surface-2 border border-border text-[11px] text-fg-muted"
                  >
                    {{ tech }}
                  </li>
                </ul>
              </div>
            </div>

            <p
              v-if="job.architecturalPatterns"
              class="mb-1 text-sm text-fg-muted"
            >
              <span class="font-semibold text-fg">Architecture:</span>
              {{ job.architecturalPatterns }}
            </p>
            <p v-if="job.methodologies" class="mb-1 text-sm text-fg-muted">
              <span class="font-semibold text-fg">Methodologies:</span>
              {{ job.methodologies }}
            </p>
            <p v-if="job.designPrinciples" class="mb-3 text-sm text-fg-muted">
              <span class="font-semibold text-fg">Design patterns & principles:</span>
              {{ job.designPrinciples }}
            </p>

            <ul
              class="space-y-2 list-disc pl-5 marker:text-accent text-fg-muted text-sm leading-relaxed"
            >
              <li v-for="ach in job.achievements" :key="ach">{{ ach }}</li>
            </ul>
            <p v-if="job.technologies" class="mt-4 text-xs leading-relaxed text-fg">
              <span class="font-bold uppercase tracking-wider text-accent text-xs mr-1">
                Stack:
              </span>
              <span class="font-semibold">{{ job.technologies }}</span>
            </p>
          </li>
        </ol>
      </section>

      <section class="mb-10">
        <h2 class="text-xl font-bold text-accent mb-4">Technical Skills</h2>
        <div class="space-y-5">
          <div v-for="group in groupedSkills" :key="group.label">
            <h3 class="mb-2 text-xs font-bold uppercase tracking-wider text-fg-muted">
              {{ group.label }}
            </h3>
            <ul class="flex flex-wrap gap-2">
              <li
                v-for="skill in group.items"
                :key="skill.id"
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-surface-2/60 border-border text-fg-muted text-sm"
              >
                <img
                  v-if="skill.icon"
                  :src="skill.icon"
                  :alt="`${skill.title} logo`"
                  width="18"
                  height="18"
                  loading="lazy"
                  decoding="async"
                  class="w-4 h-4 object-contain"
                  :class="iconClass(skill.icon)"
                />
                {{ skill.title }}
              </li>
            </ul>
          </div>
        </div>
      </section>

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

      <section>
        <h2 class="text-xl font-bold text-accent mb-4">Contact</h2>
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <li v-for="channel in socials" :key="channel.id">
            <a
              :href="channel.href"
              :target="channel.href.startsWith('http') ? '_blank' : undefined"
              :rel="channel.href.startsWith('http') ? 'noopener noreferrer' : undefined"
              class="group flex items-center gap-3.5 h-full p-4 rounded-2xl bg-surface-2/60 border border-border hover:border-accent/50 transition-colors"
            >
              <span
                class="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 border border-border group-hover:border-accent/40 transition-colors shrink-0"
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  :fill="SOCIAL_FILLED.has(channel.id) ? 'currentColor' : 'none'"
                  :stroke="SOCIAL_FILLED.has(channel.id) ? 'none' : 'currentColor'"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-5 h-5 text-accent"
                >
                  <path :d="SOCIAL_ICONS[channel.id] ?? ''" />
                </svg>
              </span>
              <span class="min-w-0">
                <span
                  class="block text-xs font-semibold uppercase tracking-wider text-fg-dim"
                >
                  {{ channel.label }}
                </span>
                <span
                  class="block mt-0.5 text-sm font-medium text-fg truncate group-hover:text-accent transition-colors"
                >
                  {{ channel.display }}
                </span>
              </span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  </article>
</template>
