export default defineNuxtConfig({
  compatibilityDate: '2024-10-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true
  },
  app: {
    head: {
      title: 'Task Manager',
      meta: [
        { name: 'description', content: 'A small task management app built with Vue 3 & Nuxt.' }
      ]
    }
  }
})
