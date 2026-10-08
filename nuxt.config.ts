import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        // Generated from public/favicon.svg — see scripts/generate-favicons.mjs
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
      meta: [{ name: 'theme-color', content: '#f7faf8' }],
      script: [
        {
          // Light is the default. Applied in <head> before first paint (no
          // flash); not set via htmlAttrs so hydration never clobbers it.
          innerHTML:
            "try{document.documentElement.classList.add('light');if(localStorage.getItem('color-mode')==='dark')document.documentElement.classList.remove('light')}catch(_){}",
          tagPosition: 'head',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  typescript: { strict: true },
})
