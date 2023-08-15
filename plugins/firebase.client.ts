import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const { firebaseConfig } = config.public

  const app = initializeApp(firebaseConfig)

  const auth = getAuth(app)

  nuxtApp.vueApp.provide('auth', auth)
  nuxtApp.provide('auth', auth)
})
