export function useScrollSpy(ids: string[], topOffset = 96) {
  const active = ref<string | null>(null)

  onMounted(() => {
    let ticking = false

    const update = () => {
      ticking = false

      // The "detection line" sits a bit below the fixed header.
      const line =
        window.scrollY + topOffset + Math.round(window.innerHeight * 0.2)

      // The active section is the last one whose top has crossed the line.
      let best: string | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= line) best = id
      }

      // At the very bottom of the page, force the last section active.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      if (atBottom) best = ids[ids.length - 1] ?? best

      active.value = best
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    })
  })

  return { active }
}
