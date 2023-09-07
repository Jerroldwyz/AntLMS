import { getAuth } from "firebase-admin/auth"
import { useAuthStore } from "~~/composables/useAuthStore"
import app from "~~/utils/firebase-admin"

// server side runtime
export default defineNuxtPlugin(async (nuxtApp) => {
  const token = useFirebaseToken()
  const firebaseUser = useUser()
  const auth = getAuth(app)
  const authStore = useAuthStore()

  if (!token.value) return

  try {
    const result = await auth.verifyIdToken(token.value)
    authStore.user = await formatUser(result)
  } catch (error) {
    console.error("Not authenticated or invalid token")
  }
})
