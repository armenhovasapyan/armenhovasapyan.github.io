<script setup lang="ts">
import { profile } from '~/data/site'

const { position } = usePosition()

const { text, cursor } = useTyping({
  strings: [
    'Software Engineer',
    'Backend & Full-Stack Developer',
    '.NET · PHP · Node.js · Python',
    'Designing reliable, scalable systems',
  ],
  typeSpeed: 60,
  backSpeed: 30,
  holdMs: 1600,
  loop: true,
})
</script>

<template>
  <section
    id="hero"
    class="relative isolate overflow-hidden min-h-[100svh] flex items-center"
    aria-labelledby="hero-heading"
  >
    <div class="absolute inset-0 -z-10 bg-night" aria-hidden="true">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(16,185,129,0.16),transparent_55%),radial-gradient(circle_at_85%_75%,rgba(16,185,129,0.10),transparent_50%)]"
      />
      <div
        class="absolute inset-0 opacity-[0.04] mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:3px_3px]"
      />
    </div>

    <div class="container-page relative pt-32 pb-20 text-center">
      <h1
        id="hero-heading"
        class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] animate-fade-up"
      >
        <span class="block text-fg">{{ profile.name }}</span>
        <span class="block mt-2 text-accent">{{ profile.role }}</span>
      </h1>

      <p
        class="mt-4 text-base sm:text-lg md:text-xl text-fg-muted max-w-2xl mx-auto animate-fade-up"
        style="animation-delay: 60ms"
      >
        {{ profile.subRole }}
      </p>
      <p
        class="mt-4 text-base sm:text-lg md:text-xl text-accent font-semibold max-w-2xl mx-auto animate-fade-up"
        style="animation-delay: 60ms"
      >
        {{ position.headline }}
      </p>

      <div
        class="mt-6 flex flex-wrap items-center justify-center gap-2.5 animate-fade-up"
        style="animation-delay: 70ms"
      >
        <p
          class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-2/70 border border-border text-sm font-medium text-fg-muted"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-4 h-4 text-accent"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {{ profile.location }}
        </p>
        <p
          class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-sm font-medium text-accent"
        >
          <span
            class="relative flex w-2 h-2"
            aria-hidden="true"
          >
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
            <span class="relative inline-flex w-2 h-2 rounded-full bg-accent" />
          </span>
          {{ profile.availability }}
        </p>
      </div>

      <p
        class="mt-6 text-base sm:text-lg md:text-xl text-fg-muted max-w-2xl mx-auto animate-fade-up"
        style="animation-delay: 100ms"
      >
        {{ profile.tagline }}
      </p>

      <div
        class="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up"
        style="animation-delay: 200ms"
      >
        <a
          href="#projects"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-on-accent font-semibold hover:bg-accent-bright transition-colors"
        >
          View projects
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-4 h-4"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
        <a
          href="#contact"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-2 text-fg font-semibold border border-border hover:border-accent/50 hover:bg-surface-3 transition-all"
        >
          Contact me
        </a>
      </div>

      <p
        class="mt-12 text-sm md:text-base font-mono text-fg-muted h-6 animate-fade-up"
        style="animation-delay: 300ms"
        aria-live="polite"
      >
        <span>{{ text }}</span>
        <span
          class="inline-block w-[1px] h-4 bg-accent ml-0.5 align-middle"
          :class="cursor ? 'animate-blink' : 'opacity-0'"
          aria-hidden="true"
        />
      </p>
    </div>

    <a
      href="#skills"
      class="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full text-fg-muted hover:text-accent transition-colors"
      aria-label="Scroll down to skills"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-6 h-6 animate-bounce"
        aria-hidden="true"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </svg>
    </a>
  </section>
</template>
