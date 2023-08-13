import { resolve } from 'path';
export default defineNuxtConfig({
  ssr: false,
  typescript: {
    shim: false,
  },
  build: {
    //   extractCSS: false,
    transpile: ['vuetify'],
  },
  css: ['@/assets/scss/style.scss'],
  modules: ['@pinia/nuxt'],
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    build: {
      chunkSizeWarningLimit: 1600,
    },
  },
  devServerHandlers: [],
  hooks: {
    //   "build:done": (builder) => {
    //     const extraFilePath = path.join(
    //       builder.nuxt.options.buildDir + "/dist/server",
    //       "server.mjs"
    //     );
    //     fs.writeFileSync(extraFilePath, "export {};");
    //   },
  },
})
