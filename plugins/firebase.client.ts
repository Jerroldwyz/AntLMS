import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { useAuthStore } from "~~/composables/useAuthStore"

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const firebaseConfig = config.public
  const app = initializeApp(firebaseConfig.firebase)
  const auth = getAuth(app)

  const firebaseUser = useUser()
  const authStore = useAuthStore()

  nuxtApp.hooks.hook("app:mounted", () => {
    auth.onIdTokenChanged(async (user) => {
      if (user) {
        console.log("User signed in")
        const token = await user.getIdToken()
        setServerSession(token)
        authStore.user = await formatUser(user)
        navigateTo("/")
      } else {
        console.log("User signed out")
        setServerSession("")
        authStore.user = null
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

const setServerSession = (token: string) => {
  return $fetch("/api/session", {
    method: "POST",
    body: {
      token,
    },
  })
}
