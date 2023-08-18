import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const firebaseConfig = config.public
  const app = initializeApp(firebaseConfig.firebase)
  const auth = getAuth(app)

  // observe user state
  initUser()

  return {
    provide: {
      firebaseApp: app,
      firebaseAuth: auth,
    },
  }
})
