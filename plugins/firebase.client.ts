import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const firebaseConfig = config.public
  const app = initializeApp(firebaseConfig.firebase)
  const auth = getAuth(app)

  const firebaseUser = useUser()

  // reactive user state observer
  nuxtApp.hooks.hook('app:mounted', () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        firebaseUser.value = formatUser(user)
        console.log(
          `[Firebase Client] User signed in as ${firebaseUser.value.uid}`
        )
      } else {
        firebaseUser.value = null
        console.log('[Firebase Client] User has signed out')
      }
    })
  })

  return {
    provide: {
      firebaseApp: app,
      firebaseAuth: auth,
    },
  }
})
