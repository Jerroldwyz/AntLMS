import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { useUserStore } from "~/stores/useUserStore"
import { User } from "~/types"

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const firebaseConfig = config.public
  const app = initializeApp(firebaseConfig.firebase)
  const auth = getAuth(app)

  const userStore = useUserStore()

  nuxtApp.hooks.hook("app:beforeMount", async () => {
    if (appConfig() === "development") {
      const dummyUser = await $fetch("/api/me")
      userStore.user = dummyUser as User
      await setServerSession(null)
    } else {
      auth.onIdTokenChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken(true)
          await setServerSession(token)
          userStore.setUser(await formatUser(user))
        } else {
          await setServerSession(null)
          userStore.setUser(null)
          navigateTo("/auth/login")
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

const setServerSession = async (token: string | null) => {
  await useFetch("/api/session", {
    method: "post",
    body: {
      token,
    },
    retry: 0,
  })
}
