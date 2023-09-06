import { getAuth } from "firebase-admin/auth"
import app from "~~/utils/firebase-admin"

// server side runtime
export default defineNuxtPlugin(async (nuxtApp) => {
  const token = useFirebaseToken()
  const firebaseUser = useUser()
  const auth = getAuth(app)

  if (!token.value) return

  try {
    const result = await auth.verifyIdToken(token.value)
    firebaseUser.value = formatUser(result)
  } catch (error) {
    console.error("Not authenticated or invalid token")
  }
})
