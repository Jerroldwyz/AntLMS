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
    // auth.onAuthStateChanged(async (user) => {
    //   if (user) {
    //     firebaseUser.value = formatUser(user)
    //   } else {
    //     firebaseUser.value = null
    //     console.log('[Firebase Client] User has signed out')
    //   }
    // })
    // auth.onIdTokenChanged(async (user) => {
    //   if (user) {
    //     const token = await user.getIdToken()
    //     setServerSession(token)
    //     firebaseUser.value = formatUser(user)
    //   } else {
    //     setServerSession('')
    //     firebaseUser.value = null
    //   }
    // })
  })

  return {
    provide: {
      firebaseApp: app,
      firebaseAuth: auth,
    },
  }
})

const setServerSession = (token: string) => {
  return $fetch('/api/session', {
    method: 'POST',
    body: {
      token,
    },
  })
}
