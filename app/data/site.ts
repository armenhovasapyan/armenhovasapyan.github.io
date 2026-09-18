import type {
  Company,
  CvExperience,
  Project,
  Skill,
  SocialLink,
} from '~/types/site'

/** Career start year — the single source for every "X+ years" figure. */
export const CAREER_START_YEAR = 2014

/** Years of professional experience, computed from the career start year. */
export const yearsOfExperience = (): number =>
  new Date().getFullYear() - CAREER_START_YEAR

export const profile = {
  name: 'Armen Hovasapyan',
  role: 'Lead Software Engineer',
  subRole: 'Backend / Full-Stack Developer',
  primarySkills: 'C# / .NET / PHP / Node.js / Python',
  tagline:
    'I design, build, and operate scalable backend systems and full-stack web applications — from healthcare platforms to high-traffic iGaming services.',
  availability: 'Available for remote work and relocation',
  location: 'Yerevan, Armenia',
  email: 'armenhovasapyan@gmail.com',
  phones: ['+374 77 537 319'],
  linkedin: 'https://www.linkedin.com/in/armenhovasapyan',
  github: 'https://github.com/armenhovasapyan',
  cvPdf: '/Armen_Hovasapyan_CV.pdf',
  siteUrl: 'https://armenhovasapyan.github.io',
} as const

const ICON = '/img/icons'

export const skills: Skill[] = [
  // Languages
  { id: 'csharp', title: 'C#', icon: `${ICON}/csharp.svg`, group: 'language' },
  { id: 'php', title: 'PHP', icon: `${ICON}/php.svg`, group: 'language' },
  { id: 'python', title: 'Python', icon: `${ICON}/python.svg`, group: 'language' },
  { id: 'javascript', title: 'JavaScript', icon: `${ICON}/javascript.svg`, group: 'language' },
  { id: 'typescript', title: 'TypeScript', icon: `${ICON}/typescript.svg`, group: 'language' },
  { id: 'sql', title: 'SQL', group: 'language' },
  // Backend
  { id: 'aspnet-core', title: 'ASP.NET Core Web API', icon: `${ICON}/aspnet-core.svg`, group: 'backend' },
  { id: 'aspnet-mvc', title: 'ASP.NET MVC', icon: `${ICON}/aspnet-core.svg`, group: 'backend' },
  { id: 'dotnet-core', title: '.NET Core', icon: `${ICON}/aspnet-core.svg`, group: 'backend' },
  { id: 'laravel', title: 'Laravel', icon: `${ICON}/laravel.svg`, group: 'backend' },
  { id: 'symfony', title: 'Symfony', icon: `${ICON}/symfony.svg`, group: 'backend' },
  { id: 'yii', title: 'Yii', icon: `${ICON}/yii.svg`, group: 'backend' },
  { id: 'nodejs', title: 'Node.js', icon: `${ICON}/nodejs.svg`, group: 'backend' },
  { id: 'nestjs', title: 'NestJS', icon: `${ICON}/nestjs.svg`, group: 'backend' },
  { id: 'express', title: 'Express', icon: `${ICON}/express.svg`, group: 'backend' },
  { id: 'fastapi', title: 'FastAPI', icon: `${ICON}/fastapi.svg`, group: 'backend' },
  { id: 'falcon', title: 'Falcon', group: 'backend' },
  // Frontend
  { id: 'react', title: 'React', icon: `${ICON}/react.svg`, group: 'frontend' },
  { id: 'vue', title: 'Vue.js', icon: `${ICON}/vuejs.svg`, group: 'frontend' },
  { id: 'nuxt', title: 'Nuxt', icon: `${ICON}/nuxtjs.svg`, group: 'frontend' },
  { id: 'next', title: 'Next', icon: `${ICON}/nextjs.svg`, group: 'frontend' },
  { id: 'jquery', title: 'jQuery', icon: `${ICON}/jquery.svg`, group: 'frontend' },
  { id: 'bootstrap', title: 'Bootstrap', icon: `${ICON}/bootstrap.svg`, group: 'frontend' },
  { id: 'angularjs', title: 'AngularJS', icon: `${ICON}/angularjs.svg`, group: 'frontend' },
  // Databases
  { id: 'mssql', title: 'Microsoft SQL Server', icon: `${ICON}/mssql.svg`, group: 'database' },
  { id: 'tsql', title: 'T-SQL', group: 'database' },
  { id: 'postgresql', title: 'PostgreSQL', icon: `${ICON}/postgresql.svg`, group: 'database' },
  { id: 'mysql', title: 'MySQL', icon: `${ICON}/mysql.svg`, group: 'database' },
  { id: 'mongodb', title: 'MongoDB', icon: `${ICON}/mongodb.svg`, group: 'database' },
  { id: 'sqlite', title: 'SQLite', icon: `${ICON}/sqlite.svg`, group: 'database' },
  { id: 'firebase', title: 'Firebase', icon: `${ICON}/firebase.svg`, group: 'database' },
  // Messaging & caching
  { id: 'rabbitmq', title: 'RabbitMQ', icon: `${ICON}/rabbitmq.svg`, group: 'messaging' },
  { id: 'kafka', title: 'Kafka', icon: `${ICON}/apachekafka.svg`, group: 'messaging' },
  { id: 'redis', title: 'Redis', icon: `${ICON}/redis.svg`, group: 'messaging' },
  // Architecture & design
  { id: 'microservices', title: 'Microservices', group: 'architecture' },
  { id: 'modular-monolith', title: 'Modular Monolith', group: 'architecture' },
  { id: 'clean-architecture', title: 'Clean Architecture', group: 'architecture' },
  { id: 'ddd', title: 'Domain-Driven Design', group: 'architecture' },
  { id: 'solid', title: 'SOLID', group: 'architecture' },
  { id: 'dry-kiss-yagni', title: 'DRY / KISS / YAGNI', group: 'architecture' },
  { id: 'tdd', title: 'TDD', group: 'architecture' },
  { id: 'rest-apis', title: 'RESTful Web APIs', group: 'architecture' },
  { id: 'oop', title: 'Object-Oriented Programming', group: 'architecture' },
  // Testing
  { id: 'xunit', title: 'xUnit', group: 'testing' },
  { id: 'phpunit', title: 'PHPUnit', icon:`${ICON}/phpunit.svg`, group: 'testing' },
  { id: 'codeception', title: 'Codeception', icon:`${ICON}/codeception.svg`, group: 'testing' },
  { id: 'jest', title: 'Jest', icon: `${ICON}/jest.svg`, group: 'testing' },
  { id: 'playwright', title: 'Playwright', icon: `${ICON}/playwright.svg`, group: 'testing' },
  { id: 'pytest', title: 'PyTest', icon: `${ICON}/pytest.svg`, group: 'testing' },
  // Cloud & DevOps
  { id: 'aws', title: 'AWS', icon: `${ICON}/aws.svg`, group: 'devops' },
  { id: 'gcp', title: 'GCP', icon: `${ICON}/googlecloud.svg`, group: 'devops' },
  { id: 'docker', title: 'Docker', icon: `${ICON}/docker.svg`, group: 'devops' },
  { id: 'kubernetes', title: 'Kubernetes', icon: `${ICON}/kubernetes.svg`, group: 'devops' },
  { id: 'github-actions', title: 'GitHub Actions', icon: `${ICON}/githubactions.svg`, group: 'devops' },
  { id: 'circleci', title: 'CircleCI', icon: `${ICON}/circleci.svg`, group: 'devops' },
  { id: 'cicd', title: 'CI/CD', group: 'devops' },
  { id: 'git', title: 'Git', icon: `${ICON}/git.svg`, group: 'devops' },
  { id: 'linux', title: 'Linux', icon: `${ICON}/linux.svg`, group: 'devops' },
  // Monitoring & logging
  { id: 'datadog', title: 'Datadog', icon: `${ICON}/datadog.svg`, group: 'monitoring' },
  { id: 'elk', title: 'ELK', icon: `${ICON}/elastic.svg`, group: 'monitoring' },
  { id: 'newrelic', title: 'New Relic', icon: `${ICON}/newrelic.svg`, group: 'monitoring' },
  { id: 'sentry', title: 'Sentry', icon: `${ICON}/sentry.svg`, group: 'monitoring' },
  // Project management
  { id: 'jira', title: 'Jira', icon: `${ICON}/jira.svg`, group: 'project' },
  { id: 'linear', title: 'Linear', icon: `${ICON}/linear.svg`, group: 'project' },
  { id: 'trello', title: 'Trello', icon: `${ICON}/trello.svg`, group: 'project' },
  { id: 'notion', title: 'Notion', icon: `${ICON}/notion.svg`, group: 'project' },
  // AI tools
  { id: 'cursor', title: 'Cursor', icon: `${ICON}/cursor.svg`, group: 'ai' },
  { id: 'claude-code', title: 'Claude Code', icon: `${ICON}/claudecode.svg`, group: 'ai' },
  { id: 'codex', title: 'Codex', icon: `${ICON}/codex.svg`, group: 'ai' },
  { id: 'copilot', title: 'GitHub Copilot', icon: `${ICON}/githubcopilot.svg`, group: 'ai' },
  //Automation
  { id: 'n8n', title: 'n8n', icon: `${ICON}/n8n.svg`, group: 'automation' },
  { id: 'make', title: 'make.com', icon: `${ICON}/make.webp`, group: 'automation' },
]

export const skillGroupLabels: Record<SkillGroupKey, string> = {
  language: 'Languages',
  dotnet: '.NET',
  backend: 'Backend',
  frontend: 'Frontend',
  database: 'Databases',
  messaging: 'Messaging & caching',
  architecture: 'Architecture & design',
  testing: 'Testing',
  devops: 'Cloud & DevOps',
  monitoring: 'Monitoring & logging',
  project: 'Project management',
  ai: 'AI tools',
  automation: 'Automations',
}

type SkillGroupKey = Skill['group']

/* ------------------------------------------------------------------ */
/* Target positions                                                    */
/* ------------------------------------------------------------------ */

export type PositionId = 'dotnet' | 'php' | 'nodejs'

export type Position = {
  id: PositionId
  label: string
  /** Headline skills line, ordered for this position. */
  headline: string
  /** Skill groups reordered so the position's stack leads. */
  groupOrder: SkillGroupKey[]
  /** Skill ids floated to the front of the featured list (within their groups). */
  leadSkills: string[]
  /** Skills named in the CV summary's first body line, ordered for this position. */
  summarySkills: string[]
  /** Generated PDF filename (public/, produced by scripts/generate-cv-pdf.mjs). */
  pdf: string
}

export const POSITIONS: Position[] = [
  {
    id: 'php',
    label: 'PHP',
    headline: 'PHP / Laravel / Symfony / YII / C# / Node.js / Python',
    leadSkills: ['php', 'laravel', 'symfony', 'yii', 'phpunit', 'codeception', 'playwright'],
    summarySkills: ['PHP', 'Laravel', 'Symfony', 'Yii', 'C#', 'ASP.NET Core', 'Node.js', 'Python', 'JavaScript', 'TypeScript'],
    groupOrder: [
      'language',
      'backend',
      'dotnet',
      'architecture',
      'database',
      'devops',
      'messaging',
      'frontend',
      'testing',
      'monitoring',
      'project',
      'ai',
      'automation',
    ],
    pdf: '/Armen_Hovasapyan_CV_php.pdf',
  },
  {
    id: 'dotnet',
    label: '.NET',
    headline: 'C# / .NET / ASP.NET Core / PHP / JavaScript / TypeScript / Python',
    leadSkills: ['csharp', 'aspnet-core', 'dotnet-core', 'xunit'],
    summarySkills: ['C#', 'ASP.NET Core', 'PHP', 'Node.js', 'Python', 'JavaScript', 'TypeScript'],
    groupOrder: [
      'language',
      'dotnet',
      'backend',
      'architecture',
      'database',
      'devops',
      'messaging',
      'frontend',
      'testing',
      'monitoring',
      'project',
      'ai',
      'automation',
    ],
    pdf: '/Armen_Hovasapyan_CV_dotnet.pdf',
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    headline: 'JavaScript / TypeScript / Node.js / NestJS / C# / PHP / Python',
    leadSkills: ['javascript', 'typescript', 'nodejs', 'nestjs', 'jest', 'playwright'],
    summarySkills: ['TypeScript', 'JavaScript', 'Node.js', 'NestJS', 'C#', 'ASP.NET Core', 'PHP', 'Python'],
    groupOrder: [
      'language',
      'backend',
      'frontend',
      'database',
      'messaging',
      'devops',
      'architecture',
      'dotnet',
      'testing',
      'monitoring',
      'project',
      'ai',
      'automation',
    ],
    pdf: '/Armen_Hovasapyan_CV_nodejs.pdf',
  },
]

export const DEFAULT_POSITION: PositionId = 'php'

export const featuredSkills: Skill[] = [
  'csharp',
  'aspnet-core',
  'php',
  'laravel',
  'symfony',
  'python',
  'fastapi',
  'javascript',
  'typescript',
  'nodejs',
  'nestjs',
  'react',
  'next',
  'vue',
  'nuxt',
  'jquery',
  'mssql',
  'postgresql',
  'mysql',
  'mongodb',
  'redis',
  'rabbitmq',
  'docker',
  'kubernetes',
  'aws',
  'gcp',
  'github-actions',
  'datadog',
]
  .map((id) => skills.find((s) => s.id === id))
  .filter((s): s is Skill => Boolean(s))

const COMPANY_LOGOS = '/img/companies'

export const companies: Company[] = [
  {
    id: 'independent',
    name: 'Independent Software Engineer',
    role: 'Lead Software Engineer / Architect',
    dateFrom: 'March 2026',
    dateTo: 'Present',
    location: 'Yerevan, Armenia',
    monogram: { text: 'IS', color: '#10b981' },
  },
  {
    id: 'tidepool-labs',
    name: 'Tidepool Labs Europe',
    role: 'Lead Software Engineer',
    dateFrom: 'November 2018',
    dateTo: 'March 2026',
    location: 'Yerevan, Armenia',
    logoDark: `${COMPANY_LOGOS}/tidepool-on-dark.svg`,
    logoLight: `${COMPANY_LOGOS}/tidepool-on-light.svg`,
  },
  {
    id: 'bigbrain',
    name: 'BigBrain',
    role: 'Senior Software Engineer',
    dateFrom: 'September 2016',
    dateTo: 'October 2018',
    location: 'Yerevan, Armenia',
    logoDark: `${COMPANY_LOGOS}/bigbrain.jpg`,
  },
  {
    id: 'web-projects',
    name: 'Web Projects',
    role: 'Project Manager / Team Lead',
    dateFrom: 'March 2016',
    dateTo: 'September 2016',
    location: 'Yerevan, Armenia',
    logoDark: `${COMPANY_LOGOS}/web-projects.png`,
  },
  {
    id: 'i-like-it',
    name: 'I Like IT',
    role: 'Web Developer',
    dateFrom: 'October 2015',
    dateTo: 'March 2016',
    location: 'Yerevan, Armenia',
    logoDark: `${COMPANY_LOGOS}/i-like-it.jpg`,
  },
  {
    id: 'iguan-systems',
    name: 'Iguan Systems',
    role: 'Web Developer',
    dateFrom: 'July 2014',
    dateTo: 'October 2015',
    location: 'Yerevan, Armenia',
    logoDark: `${COMPANY_LOGOS}/iguan.png`,
  },
]

export const projects: Project[] = [
  {
    id: 'igaming',
    name: 'Chalkboard (iGaming Platform)',
    type: 'iGaming · USA',
    url: 'https://chalkboard.io',
    domain: 'Chalkboard',
    location: 'Tidepool Labs Europe',
    logoDark: `${COMPANY_LOGOS}/chalkboard-on-dark.svg`,
    logoLight: `${COMPANY_LOGOS}/chalkboard-on-light.svg`,
    description:
      'High-traffic iGaming platform built with Node.js, NestJS and TypeScript — real-time services over PostgreSQL, MongoDB and Redis, delivered on GCP with Kubernetes.',
    technologies: [
      'Node.js',
      'NestJS',
      'TypeScript',
      'Python',
      'Falcon',
      'React',
      'TypeORM',
      'PostgreSQL',
      'MongoDB',
      'Firebase',
      'Redis',
      'RabbitMQ',
      'Jest',
      'GCP',
      'Docker',
      'Kubernetes',
      'GitHub Actions',
      'Datadog',
      'Sentry',
    ],
  },
  {
    id: 'healthcare',
    name: 'MDsave (HealthCare)',
    type: 'Healthcare · USA',
    url: 'https://www.mdsave.com',
    domain: 'MDsave',
    location: 'Tidepool Labs Europe',
    logoDark: `${COMPANY_LOGOS}/mdsave.png`,
    description:
      'Healthcare marketplace platform — modernized from PHP/Yii to Node.js and TypeScript, with GraphQL APIs, data pipelines on Databricks and AWS infrastructure.',
    technologies: [
      'PHP 8+',
      'Yii',
      'Node.js',
      'TypeScript',
      'PostgreSQL',
      'Databricks',
      'RabbitMQ',
      'Redis',
      'React',
      'GraphQL',
      'Apollo',
      'Codeception',
      'Jest',
      'AWS',
      'Docker',
      'CircleCI',
      'Datadog',
    ],
  },
]

export const cvExperience: CvExperience[] = [
  {
    company: 'Independent Software Engineer',
    role: 'Lead Software Engineer / Architect',
    location: 'Yerevan, Armenia',
    period: 'Mar 2026 - PRESENT',
    technologies:
      'C#, ASP.NET Core, Python, FastAPI, PHP, Laravel, Symfony, JavaScript, TypeScript, NestJS, React, Vue.js, Nuxt, Microsoft SQL Server, PostgreSQL, MySQL, SQLite, Redis, RabbitMQ, Docker',
    achievements: [
      'Designing and developing scalable web applications and backend services using C#, ASP.NET Core Web API, PHP, Python, and TypeScript.',
      'Developing RESTful Web APIs with ASP.NET Core, applying object-oriented programming, SOLID principles, Clean Architecture, and Domain-Driven Design.',
      'Designing and implementing database-driven applications using Microsoft SQL Server, PostgreSQL, MySQL, SQLite, and MongoDB.',
      'Implementing data access and business logic with a focus on performance, scalability, reliability, and data consistency.',
      'Identifying performance bottlenecks, debugging application issues, and implementing solutions to improve application reliability and responsiveness.',
      'Designing scalable backend architectures based on Microservices and Modular Monolith patterns.',
      'Developing integrations with third-party APIs and external services.',
      'Implementing automated testing using xUnit and other testing frameworks depending on the technology stack.',
      'Implementing containerized deployments and CI/CD pipelines using Docker and GitHub Actions.',
      'Automating workflows and business logic using n8n and backend integrations.',
    ],
  },
  {
    company: 'Tidepool Labs Europe',
    role: 'Lead Software Engineer',
    location: 'Yerevan, Armenia',
    period: 'Nov 2018 – Mar 2026',
    projects: [
      {
        name: 'Chalkboard (iGaming Platform)',
        country: 'USA',
        url: 'https://chalkboard.io',
        technologies: [
          'TypeScript',
          'Node.js',
          'NestJS',
          'TypeORM',
          'Python',
          'Falcon',
          'React',
          'Next.js',
          'React Native',
          'PostgreSQL',
          'MongoDB',
          'Firebase',
          'Databricks',
          'Redis',
          'RabbitMQ',
          'Jest',
          'GCP',
          'Docker',
          'Kubernetes',
          'GitHub Actions',
          'Datadog',
          'Sentry',
          'etc',
        ],
      },
      {
        name: 'MDsave (HealthCare platform)',
        country: 'USA',
        url: 'https://www.mdsave.com',
        technologies: [
          'PHP 8+',
          'Yii',
          'TypeScript',
          'Node.js',
          'PostgreSQL',
          'Databricks',
          'RabbitMQ',
          'Redis',
          'React',
          'GraphQL',
          'Apollo',
          'Codeception',
          'Jest',
          'AWS',
          'Docker',
          'CircleCI',
          'Datadog',
        ],
      },
    ],
    architecturalPatterns: 'Microservices, Modular Monolith',
    methodologies: 'Agile/Scrum',
    designPrinciples: 'OOP, SOLID, Clean Architecture',
    achievements: [
      'Designed and maintained scalable backend applications and services for high-traffic healthcare and iGaming platforms.',
      'Developed and maintained Web APIs and backend services.',
      'Worked with relational and NoSQL databases, including PostgreSQL and MongoDB.',
      'Investigated application bottlenecks, production issues, and performance problems and implemented solutions.',
      'Collaborated with developers, QA, product managers, and other stakeholders in an Agile/Scrum environment.',
      'Mentored developers and promoted best practices across the team.',
      'Ensured high code quality through best practices, thorough testing, and code reviews.',
      'Made architectural decisions to build scalable, maintainable, and efficient systems.',
      'Worked closely with developers and product managers to align on solutions.',
      'Solved complex technical problems with scalable solutions.',
    ],
  },
  {
    company: 'BigBrain',
    role: 'Senior Software Engineer',
    location: 'Yerevan, Armenia',
    period: 'Sep 2016 - Oct 2018',
    projects: [
      {
        name: 'MDsave (HealthCare platform)',
        country: 'USA',
        url: 'https://www.mdsave.com',
        technologies: [
          'PHP (5.6 - 7.4)',
          'Yii',
          'TypeScript',
          'Node.js',
          'PostgreSQL',
          'RabbitMQ',
          'Redis',
          'jQuery',
          'Bootstrap',
          'AngularJS',
          'Codeception',
          'Jest',
          'GraphQL',
          'Apollo',
          'AWS',
          'Docker',
          'CircleCI',
          'New Relic',
          'ELK',
          'Jira',
        ],
      },
    ],
    methodologies: 'Agile/Scrum',
    achievements: [
      'Developed and maintained backend services and Web API integrations.',
      'Developed and optimized complex features using PHP and Angular, ensuring performance and scalability.',
      'Worked with PostgreSQL, RabbitMQ, and Redis.',
      'Investigated production issues, performance bottlenecks, and application errors.',
      'Collaborated with product managers and developers to translate business needs into technical solutions.',
      'Contributed to architectural decisions, ensuring system reliability and maintainability.',
      'Provided production support for healthcare applications, including log monitoring, debugging, and performance tuning.',
      'Documented technical implementations, ensuring clarity and knowledge sharing within the team.',
    ],
  },
  {
    company: 'Web Projects',
    role: 'Project Manager / Team Lead',
    location: 'Yerevan, Armenia',
    period: 'Mar 2016 - Sep 2016',
    projects: [
      {
        name: 'PayKickstart',
        country: 'USA',
        url: 'https://paykickstart.com',
        technologies: [
          'PHP',
          'Laravel',
          'MySQL',
          'jQuery',
          'Bootstrap',
          'AngularJS',
          'Ionic',
          'Cordova'
        ],
      },
      {
        name: 'MonkeyVPN',
        country: 'USA',
        url: 'https://www.monkeyvpn.com',
        technologies: [
          'PHP',
          'Laravel',
          'MySQL',
          'jQuery',
          'Bootstrap',
          'AngularJS',
          'Ionic',
          'Cordova'
        ],
      }
    ],
    // technologies:
    //   'PHP, Laravel, MySQL, ElasticSearch, PHPUnit, JavaScript, jQuery, AngularJS, Bootstrap, Jira, Trello',
    achievements: [
      'Contributed to architectural decisions, ensuring system reliability and maintainability.',
      'Led a team of 5-6 developers and a QA engineer.',
      'Ensured high code quality through best practices, thorough testing, and code reviews.',
      'Documented technical implementations, ensuring clarity and knowledge sharing within the team.',
    ],
  },
  {
    company: 'I Like IT',
    role: 'Web Developer',
    location: 'Yerevan, Armenia',
    period: 'Oct 2015 - Mar 2016',
    projects: [
      {
        name: 'NEON',
        country: 'USA',
        url: 'https://neon-mobile.com',
        technologies: [
          'PHP',
          'Laravel',
          'MySQL',
          'jQuery',
          'Bootstrap',
          'AngularJS'
        ],
      },
      {
        name: 'UserGrow',
        country: 'USA',
        url: 'https://usergrow.com',
        technologies: [
          'PHP',
          'Laravel',
          'MySQL',
          'jQuery',
          'Bootstrap',
          'AngularJS'
        ],
      },
    ],
    technologies:
      'PHP, Laravel, MySQL, ElasticSearch, PHPUnit, JavaScript, jQuery, AngularJS, Bootstrap, Jira, Trello',
    achievements: [
      'On-site design and development of web applications in PHP/MySQL.',
      'Developed web services in PHP interfacing with third-party APIs.',
      'Integrated content management systems and payment processing gateways.',
      'Helped drive the definition of PHP and JS frameworks to support new features and refactor legacy elements.',
      'Worked with designers, frontend and project management staff to capture requirements for the functional elements of website projects.',
    ],
  },
  {
    company: 'Iguan Systems',
    role: 'Web Developer',
    location: 'Yerevan, Armenia',
    period: 'Jul 2014 - Oct 2015',
    projects: [
      {
        name: 'Balloon in a Box',
        country: 'UK',
        url: 'https://ballooninabox.co.uk',
        technologies: [
          'PHP',
          'Laravel',
          'MySQL',
          'jQuery',
          'Bootstrap',
          'AngularJS'
        ],
      },
      {
        name: 'Balloons by Post',
        country: 'UK',
        url: 'https://balloonsbypost.co.uk',
        technologies: [
          'PHP',
          'Laravel',
          'MySQL',
          'jQuery',
          'Bootstrap',
          'AngularJS'
        ],
      },
      {
        name: 'Delivery Balloon',
        country: 'UK',
        url: 'http://deliveryballoon.co.uk',
        technologies: [
          'PHP',
          'Laravel',
          'MySQL',
          'jQuery',
          'Bootstrap',
          'AngularJS'
        ],
      },
      {
        name: 'FerBuy',
        country: 'USA',
        url: 'https://www.ferbuy.com',
        technologies: [
          'PHP',
          'Laravel',
          'API',
          'Composer package'
        ],
      },
      {
        name: 'eDriven Scoreboard',
        country: 'USA',
        url: 'https://edrivensbdev.firebaseapp.com',
        technologies: [
          'JavaScript',
          'Ionic',
          'Cordova',
          'AngularJS',
          'Firabase',
          'jQuery',
          'Bootstrap'
        ],
      }
    ],
    technologies:
      'PHP, Laravel, CodeIgniter, Zend, Magento, MySQL, MS SQL, MongoDB, ElasticSearch, JavaScript, jQuery, AngularJS, Bootstrap, Ionic, Jira, Trello',
    achievements: [
      'On-site design and development of web applications in PHP/MySQL.',
      'Developed web services in PHP interfacing with third-party APIs.',
      'Integrated content management systems and payment processing gateways.',
      'Helped drive the definition of PHP and JS frameworks to support new features and refactor legacy elements.',
      'Worked with designers, frontend and project management staff to capture requirements for the functional elements of website projects.',
    ],
  },
]

export const summary = {
  intro:
    `Software Engineer with ${yearsOfExperience()} years of professional software development experience building and maintaining scalable web applications and backend systems.`,
  highlights: [
    `${yearsOfExperience()} years delivering production-grade backend and full-stack systems.`,
    'Led and mentored engineering teams across healthcare and iGaming platforms.',
    'Applied Microservices, Modular Monolith, Clean Architecture, and DDD in production.',
    'Agile/Scrum delivery in cross-functional teams with developers, QA, and product managers.',
  ],
}

/**
 * Position-aware summary body lines. The skills sentence reorders to lead
 * with the selected position's stack; the rest of the summary is shared.
 */
export const summaryBody = (positionId: PositionId): string[] => {
  const position = POSITIONS.find((p) => p.id === positionId) ?? POSITIONS[0]!
  return [
    `Strong background in backend and full-stack development with ${position.summarySkills.join(', ')}.`,
    'Experienced in RESTful Web APIs, object-oriented programming, database-driven applications, distributed systems, microservices, Clean Architecture, Domain-Driven Design, SOLID principles, testing, and performance optimization.',
    'Hands-on experience with Microsoft SQL Server, PostgreSQL, MySQL, MongoDB, Redis, RabbitMQ, Docker, Kubernetes, AWS, and GCP.',
    'Experienced working in Agile/Scrum environments and collaborating with developers, QA, product managers, and other stakeholders.',
  ]
}

export const socials: SocialLink[] = [
  {
    id: 'email',
    label: 'Email',
    href: `mailto:${profile.email}`,
    display: profile.email,
  },
  {
    id: 'phone',
    label: 'Phone / WhatsApp',
    href: 'https://wa.me/37477537319',
    display: profile.phones[0],
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: profile.linkedin,
    display: 'linkedin.com/in/armenhovasapyan',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: profile.github,
    display: 'github.com/armenhovasapyan',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    href: 'https://t.me/armenhovasapyan',
    display: '@armenhovasapyan',
  },
]

export const education = [
  {
    period: '2003 - 2008',
    name: 'State Engineering University of Armenia, Yerevan',
    degree: "Master's Degree — Technology of Machine Building",
  },
] as const

export const languages = [
  { id: 'hy', name: 'Armenian', level: 'Native' },
  { id: 'en', name: 'English', level: 'Professional Proficiency' },
  { id: 'ru', name: 'Russian', level: 'Professional Proficiency' },
] as const
