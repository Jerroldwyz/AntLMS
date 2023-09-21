import { getAuth } from "firebase-admin/auth"
import { getFirebaseAdmin } from "~/utils/firebase-admin"

// server side runtime
export default defineNuxtPlugin(async (nuxtApp) => {
  if (appConfig() === "development") {
  } else {
    const token = useFirebaseToken()
    const auth = getAuth(getFirebaseAdmin())
    const authStore = useAuthStore()

    if (!token.value) return

    try {
      const result = await auth.verifyIdToken(token.value)
      authStore.user = await formatUser(result)
    } catch (error) {
      console.error("Not authenticated or invalid token")
    }
  }
})
