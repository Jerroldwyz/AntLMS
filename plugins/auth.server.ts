import { getAuth } from "firebase-admin/auth"
import { User } from "~/types"

// server side runtime
export default defineNuxtPlugin((nuxtApp) => {
  const firebaseToken = useFirebaseToken()

  if (!firebaseToken.value) return

  const app = useFirebaseAdmin()!
  const auth = getAuth(app)
  const userStore = useUserStore()

  try {
    // const token = await auth.verifyIdToken(firebaseToken.value)
    // if (token) {
    //   const userRecord = await auth.getUser(token.uid)
    //   const isAdmin: boolean = userRecord.customClaims?.admin
    //   userStore.setUser(await formatUser(userRecord, isAdmin))
    // }
  } catch (error) {
    console.error("Can't verify session:", error)
  }
})
