<script setup lang="ts">
import { profile, socials } from '~/data/site'
import { SOCIAL_ICONS, SOCIAL_FILLED } from '~/utils/social-icons'

const ICONS = SOCIAL_ICONS
const FILLED = SOCIAL_FILLED

const email = socials.find((s) => s.id === 'email')
const channels = socials.filter((s) => s.id !== 'email')

const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

const copyEmail = async () => {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable')
    await navigator.clipboard.writeText(profile.email)
  } catch {
    // Clipboard API blocked or unavailable — fall back to the legacy approach.
    const ta = document.createElement('textarea')
    ta.value = profile.email
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    try {
      document.execCommand('copy')
    } catch {}
    ta.remove()
  }
  copied.value = true
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => (copied.value = false), 2000)
}

onBeforeUnmount(() => clearTimeout(copiedTimer))
</script>

<template>
  <section
    id="contact"
    class="relative py-14 md:py-20 isolate overflow-hidden"
    aria-labelledby="contact-heading"
  >
    <div class="absolute inset-0 -z-10" aria-hidden="true">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.10),transparent_50%)]"
      />
    </div>

    <div class="container-page">
      <header class="mb-10 text-center">
        <p class="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
          Contact
        </p>
        <h2
          id="contact-heading"
          class="heading-accent text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
        >
          Contact Me
        </h2>
        <div
          class="mt-5 flex flex-wrap items-center justify-center gap-2.5"
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
        <p class="mt-6 text-base md:text-lg text-fg-muted max-w-2xl mx-auto">
          Open to senior engineering roles and consulting engagements. Email is
          the most reliable channel — I typically reply within one business day.
        </p>
      </header>

      <div class="grid gap-4 lg:grid-cols-3 items-stretch">
        <!-- Featured email card: left column, stretches to the channel grid's height.
             Mobile: icon + address on one row, actions below.
             Desktop: line 1 = icon + "Email", line 2 = address, line 3 = actions. -->
        <div
          class="p-5 sm:p-6 lg:p-8 rounded-2xl bg-surface-2/60 border border-border hover:border-accent/40 transition-colors flex flex-col justify-center gap-4 lg:gap-5"
        >
          <div class="flex items-center gap-3.5">
            <span
              class="flex items-center justify-center w-11 h-11 lg:w-12 lg:h-12 rounded-xl bg-accent/10 border border-accent/25 shrink-0"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-5 h-5 text-accent"
              >
                <path :d="ICONS.email" />
              </svg>
            </span>

            <div class="flex-1 min-w-0">
              <p class="hidden lg:block text-xs font-semibold uppercase tracking-wider text-fg-dim">
                Email
              </p>
              <p class="lg:hidden text-lg font-semibold text-fg break-all">
                {{ profile.email }}
              </p>
            </div>
          </div>

          <p class="hidden lg:block text-xl font-semibold text-fg break-all">
            {{ profile.email }}
          </p>

          <div class="flex items-center gap-2">
            <button
              type="button"
              class="inline-flex items-center justify-center gap-1.5 w-11 h-11 shrink-0 sm:w-auto sm:h-auto sm:px-3.5 sm:py-2.5 rounded-lg bg-surface-3/80 border border-border text-sm font-semibold text-fg hover:border-accent/50 hover:text-accent transition-colors cursor-pointer"
              :aria-label="copied ? 'Email copied to clipboard' : 'Copy email address to clipboard'"
              @click="copyEmail"
            >
              <svg
                v-if="!copied"
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
                <rect x="9" y="9" width="12" height="12" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-4 h-4 text-accent"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span class="hidden sm:inline">{{ copied ? 'Copied' : 'Copy' }}</span>
            </button>

            <a
              v-if="email"
              :href="email.href"
              class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-on-accent text-sm font-semibold hover:bg-accent-bright transition-colors"
            >
              Email me
            </a>
          </div>
        </div>

        <!-- Other channels: each shown exactly once; 2×2 grid beside the email card on desktop -->
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:col-span-2 gap-4">
          <li v-for="channel in channels" :key="channel.id">
            <a
              :href="channel.href"
              :target="channel.href.startsWith('http') ? '_blank' : undefined"
              :rel="channel.href.startsWith('http') ? 'noopener noreferrer' : undefined"
              class="group flex items-center gap-3.5 h-full p-5 rounded-2xl bg-surface-2/60 border border-border hover:border-accent/50 transition-colors"
            >
              <span
                class="flex items-center justify-center w-11 h-11 rounded-lg bg-accent/10 border border-border group-hover:border-accent/40 transition-colors shrink-0"
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  :fill="FILLED.has(channel.id) ? 'currentColor' : 'none'"
                  :stroke="FILLED.has(channel.id) ? 'none' : 'currentColor'"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-5 h-5 text-accent"
                >
                  <path :d="ICONS[channel.id] ?? ''" />
                </svg>
              </span>
              <span class="min-w-0">
                <span class="block text-xs font-semibold uppercase tracking-wider text-fg-dim">
                  {{ channel.label }}
                </span>
                <span class="block mt-0.5 text-sm font-medium text-fg truncate group-hover:text-accent transition-colors">
                  {{ channel.display }}
                </span>
              </span>
            </a>
          </li>
        </ul>

      </div>
    </div>
  </section>
</template>
