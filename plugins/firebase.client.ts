import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { User } from "~/types"

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const firebaseConfig = config.public
  const app = initializeApp(firebaseConfig.firebase)
  const auth = getAuth(app)

  const authStore = useAuthStore()

  nuxtApp.hooks.hook("app:mounted", async () => {
    if (process.env.NODE_ENV === "development") {
      console.log("development")
      const dummyUser = await $fetch("/api/users", {
        method: "get",
      })
      authStore.user = (dummyUser as User[])[0]
      setServerSession("")
    } else {
      console.log(process.env.NODE_ENV)
      auth.onIdTokenChanged(async (user) => {
        if (user) {
          console.log("User signed in")
          const token = await user.getIdToken()
          setServerSession(token)
          authStore.user = await formatUser(user)
          user.getIdTokenResult().then((idTokenResult) => {
            if (idTokenResult.claims.admin) {
              authStore.isAdmin = true
              navigateTo("/admin")
            } else {
              authStore.isAdmin = false
              navigateTo("/")
            }
          })
        } else {
          console.log("User signed out")
          setServerSession("")
          authStore.user = null
        }
      })
    }
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
