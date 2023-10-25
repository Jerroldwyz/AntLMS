import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { useUserStore } from "~/stores/useUserStore"

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const firebaseConfig = config.public
  const app = initializeApp(firebaseConfig.firebase)
  const auth = getAuth(app)

  const userStore = useUserStore()

  nuxtApp.hooks.hook("app:beforeMount", () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await userStore.fetchCurrentUser(user)
      } else {
        await setServerSession(null)
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
