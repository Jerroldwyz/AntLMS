export default defineNuxtConfig({
  ssr: false,
  typescript: {
    shim: false,
  },
  build: {
    //   extractCSS: false,
    transpile: ['vuetify'],
  },
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
  runtimeConfig: {
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    public: {
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        meassurementId: process.env.FIREBASE_MEASSUREMENT_ID,
      },
    },
  },
})
