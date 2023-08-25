export default defineNuxtConfig({
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
  modules: ['@pinia/nuxt'],
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
})
