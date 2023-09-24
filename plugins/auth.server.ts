import { getAuth } from "firebase-admin/auth"
import { getFirebaseAdmin } from "~/utils/firebase-admin"

// server side runtime
export default defineNuxtPlugin(async (nuxtApp) => {
  const token = useFirebaseToken()

  if (!token.value) return

  const auth = useServerAuth()!
  const authStore = useAuthStore()

  try {
    const currentUser = await auth.verifySessionCookie(token.value)
  } catch (error) {
    console.error("Can't verify session:", error)
  }
})
