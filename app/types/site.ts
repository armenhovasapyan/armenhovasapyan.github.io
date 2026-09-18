export type SkillGroup =
  | 'language'
  | 'dotnet'
  | 'backend'
  | 'frontend'
  | 'database'
  | 'messaging'
  | 'architecture'
  | 'testing'
  | 'devops'
  | 'monitoring'
  | 'project'
  | 'ai'
  | 'automation'

export type Skill = {
  id: string
  title: string
  icon?: string
  group: SkillGroup
  cvOnly?: boolean
}

export type Company = {
  id: string
  name: string
  role: string
  dateFrom: string
  dateTo: string
  location: string
  note?: string
  /** Logo optimized for the dark theme (light-colored artwork). */
  logoDark?: string
  /** Logo optimized for the light theme (dark-colored artwork). Defaults to logoDark. */
  logoLight?: string
  /** Brand-styled monogram badge shown when no logo file exists. */
  monogram?: { text: string; color: string }
}

export type Project = {
  id: string
  name: string
  type: string
  url: string | null
  domain: string | null
  location: string
  description: string
  technologies: string[]
  /** Project/brand logo optimized for the dark theme. */
  logoDark?: string
  /** Project/brand logo optimized for the light theme. Defaults to logoDark. */
  logoLight?: string
  /** Brand-styled monogram badge shown when no logo file exists. */
  monogram?: { text: string; color: string }
}

export type CvExperience = {
  company: string
  role: string
  location: string
  period: string
  projects?: {
    name: string
    country: string
    url: string | null
    technologies: string[]
  }[]
  technologies?: string
  architecturalPatterns?: string
  methodologies?: string
  designPrinciples?: string
  achievements: string[]
}

export type SocialLink = {
  id: string
  label: string
  href: string
  display: string
}
