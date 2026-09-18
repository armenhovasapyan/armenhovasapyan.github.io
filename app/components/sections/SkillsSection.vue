<script setup lang="ts">
import { featuredSkills, skillGroupLabels } from '~/data/site'
import SectionHeading from '~/components/ui/SectionHeading.vue'
import SkillCard from '~/components/ui/SkillCard.vue'

const { position } = usePosition()

// Reorder the featured skills so the selected position's stack leads: groups
// first by the position's order, then the position's lead skills within them.
const leadRank = computed(() => new Map(position.value.leadSkills.map((id, i) => [id, i])))

const orderedSkills = computed(() => {
  const rank = new Map(position.value.groupOrder.map((g, i) => [g, i]))
  return [...featuredSkills].sort((a, b) => {
    const g = (rank.get(a.group) ?? 99) - (rank.get(b.group) ?? 99)
    if (g !== 0) return g
    const la = leadRank.value.has(a.id) ? leadRank.value.get(a.id)! : 99
    const lb = leadRank.value.has(b.id) ? leadRank.value.get(b.id)! : 99
    return la - lb
  })
})
</script>

<template>
  <section id="skills" class="py-14 md:py-20" aria-labelledby="skills-heading">
    <div class="container-page">
      <SectionHeading
        eyebrow="Expertise"
        title="Technical Skills"
        subtitle="The languages, frameworks, and platforms I use to design and deliver production systems."
      />

      <TransitionGroup
        tag="ul"
        name="skill-shuffle"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        aria-label="Technical skills"
      >
        <SkillCard
          v-for="skill in orderedSkills"
          :key="skill.id"
          :skill="skill"
        />
      </TransitionGroup>

      <p class="mt-3 text-center text-xs text-fg-dim">
        Ordered for the
        <span class="text-accent font-semibold">{{ position.label }}</span> stack.
      </p>

      <p class="mt-8 text-center text-sm text-fg-dim">
        This is a selection — the
        <NuxtLink to="/cv" class="text-accent hover:text-accent-bright font-semibold"
          >full CV</NuxtLink
        >
        lists tools and practices across all {{ Object.keys(skillGroupLabels).length }} categories.
      </p>
    </div>
  </section>
</template>
