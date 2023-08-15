import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const firebaseConfig = config.public.firebase

  const app = initializeApp(firebaseConfig)

  // console.log(app)

  const auth = getAuth(app)

  nuxtApp.vueApp.provide('auth', auth)
  nuxtApp.provide('auth', auth)
})
