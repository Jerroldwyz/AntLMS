import { getAuth } from "firebase-admin/auth"
import { User } from "~/types"

// server side runtime
export default defineNuxtPlugin(async (nuxtApp) => {
  const firebaseToken = useFirebaseToken()

  if (!firebaseToken.value) return

  const app = useFirebaseAdmin()!
  const auth = getAuth(app)
  const userStore = useUserStore()

  try {
    const token = await auth.verifyIdToken(firebaseToken.value)
    userStore.setUser((await formatUser(token)) as unknown as User)
  } catch (error) {
    console.error("Can't verify session:", error)
  }
})
