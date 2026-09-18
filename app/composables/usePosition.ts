import type { PositionId } from '~/data/site'
import { POSITIONS, DEFAULT_POSITION } from '~/data/site'

const STORAGE_KEY = 'cv-position'

const isPositionId = (value: unknown): value is PositionId =>
  typeof value === 'string' && POSITIONS.some((p) => p.id === value)

/**
 * Resolve a `?skill=` / `?position=` query value to a position id.
 * Accepts a 1-based index (`?skill=1` → first position, PHP), a position id
 * (`?skill=php`), or a label (`?skill=Node.js`). Returns null if unknown.
 */
const fromParam = (raw: unknown): PositionId | null => {
  const value = (Array.isArray(raw) ? raw[0] : raw)?.toString().trim().toLowerCase()
  if (!value) return null
  if (/^\d+$/.test(value)) return POSITIONS[Number(value) - 1]?.id ?? null
  return (
    POSITIONS.find((p) => p.id === value)?.id ??
    POSITIONS.find((p) => p.label.toLowerCase() === value)?.id ??
    null
  )
}

/** Query params have been consumed once per page load (the redirect is idempotent). */
let queryHandled = false

/**
 * Selected target position (.NET / PHP / Node.js). Resolution order:
 *
 * 1. `?skill=…` / `?position=…` query param — wins over everything, is
 *    written to localStorage, and the URL is cleaned (params stripped via
 *    router.replace, no reload) so links can be shared without the param.
 * 2. localStorage — a returning visitor keeps their last choice.
 * 3. Default: PHP (`DEFAULT_POSITION`).
 *
 * The stored value is applied after hydration (onMounted) so server-rendered
 * markup always matches the initial client render — no hydration mismatch.
 */
export const usePosition = () => {
  const route = useRoute()
  const router = useRouter()
  const positionId = useState<PositionId>('position', () => DEFAULT_POSITION)

  const position = computed(
    () => POSITIONS.find((p) => p.id === positionId.value) ?? POSITIONS[0]!,
  )

  const setPosition = (id: PositionId) => {
    positionId.value = id
    if (import.meta.client) {
      try {
        localStorage.setItem(STORAGE_KEY, id)
      } catch {}
    }
  }

  if (import.meta.client) {
    onMounted(() => {
      // Consume the query param once per full page load (both pages using the
      // composable mount on first render; client-side navigation reuses state).
      if (!queryHandled) {
        queryHandled = true
        const param = fromParam(route.query.skill ?? route.query.position)
        if (param) {
          setPosition(param)
          if (route.query.skill !== undefined || route.query.position !== undefined) {
            const query = { ...route.query }
            delete query.skill
            delete query.position
            router.replace({ query })
          }
          return
        }
      }
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        positionId.value = isPositionId(stored) ? stored : DEFAULT_POSITION
      } catch {
        positionId.value = DEFAULT_POSITION
      }
    })
  }

  return { positionId, position }
}
