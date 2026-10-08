type Options = {
  /** Plain list, or a getter so callers can derive strings from reactive state. */
  strings: string[] | (() => string[])
  typeSpeed?: number
  backSpeed?: number
  holdMs?: number
  loop?: boolean
}

export function useTyping(opts: Options) {
  const text = ref('')
  const cursor = ref(true)

  const reduced =
    import.meta.client &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let stringIdx = 0
  let charIdx = 0
  let phase: 'typing' | 'holding' | 'deleting' = 'typing'
  let timer: ReturnType<typeof setTimeout> | null = null
  let stopped = false

  // Resolved on every tick so a getter-backed list stays in sync with the
  // caller's reactive state (e.g. the selected position).
  const list = () => (typeof opts.strings === 'function' ? opts.strings() : opts.strings)

  const tick = () => {
    if (stopped) return

    const strings = list()
    const current = strings[stringIdx] ?? ''

    if (phase === 'typing') {
      charIdx += 1
      text.value = current.slice(0, charIdx)
      if (charIdx >= current.length) {
        phase = 'holding'
        timer = setTimeout(tick, opts.holdMs ?? 1600)
        return
      }
      timer = setTimeout(tick, opts.typeSpeed ?? 60)
    } else if (phase === 'holding') {
      phase = 'deleting'
      timer = setTimeout(tick, opts.backSpeed ?? 30)
    } else {
      charIdx -= 1
      text.value = current.slice(0, charIdx)
      if (charIdx <= 0) {
        phase = 'typing'
        stringIdx = (stringIdx + 1) % strings.length
        if (!opts.loop && stringIdx === 0) {
          stopped = true
          return
        }
        timer = setTimeout(tick, 250)
        return
      }
      timer = setTimeout(tick, opts.backSpeed ?? 30)
    }
  }

  onMounted(() => {
    if (reduced) {
      text.value = list()[0] ?? ''
      cursor.value = false
      return
    }
    tick()
  })

  onBeforeUnmount(() => {
    stopped = true
    if (timer) clearTimeout(timer)
  })

  return { text, cursor }
}
