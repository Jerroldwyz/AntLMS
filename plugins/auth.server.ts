import { getAuth } from "firebase-admin/auth"
import app from "~~/utils/firebase-admin"

export default defineNuxtPlugin(async () => {
  const token = useCookie("token")
  const user = useUser()

  try {
    const auth = getAuth(app)
    if (token.value) {
      const result = await auth.verifyIdToken(token.value)
      user.value = formatUser(result)
      console.log(user.value)
    } else {
      user.value = null
    }
  } catch (error) {
    // not authenticated or invalid token
    token.value = null
  }
})
