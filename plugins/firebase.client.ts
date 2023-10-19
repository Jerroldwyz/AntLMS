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
  const authStore = useAuthStore()

  nuxtApp.hooks.hook("app:beforeMount", () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        userStore.uid = user.uid

        const idTokenResult = await user.getIdTokenResult(true)
        const isAdmin = !!idTokenResult.claims.admin
        const token = await user.getIdToken(true)
        await setServerSession(token)
        await authStore.authenticateUser(token)
        // if (isAdmin) {
        //   navigateTo("/admin")
        // }
      } else {
        await setServerSession(null)
        userStore.$reset()
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
