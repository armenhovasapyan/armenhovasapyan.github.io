<script setup lang="ts">
import {
  skills,
  skillGroupLabels,
} from '~/data/site'

const { position } = usePosition()

const leadRank = computed(() => new Map(position.value.leadSkills.map((id, i) => [id, i])))


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
</script>

<template>
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
</template>
