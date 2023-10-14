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

  nuxtApp.hooks.hook("app:beforeMount", () => {
    auth.onIdTokenChanged(async (user) => {
      if (user) {
        if (!user.emailVerified) {
          navigateTo("/auth/verify")
        }

        const idTokenResult = await user.getIdTokenResult(true)
        const isAdmin = !!idTokenResult.claims.admin
        const token = await user.getIdToken(true)
        await setServerSession(token)
        userStore.setUser(await formatUser(user, isAdmin))
        if (isAdmin) {
          navigateTo("/admin")
        }
      } else {
        await setServerSession(null)
        userStore.setUser(null)
        navigateTo("/auth/login")
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

export const setServerSession = async (token: string | null) => {
  await useFetch("/api/auth/session", {
    method: "post",
    body: {
      token,
    },
    retry: 0,
  })
}
