import { useServerAuth } from "~/composables/useServerAuth.server"

// server side runtime
export default defineNuxtPlugin(async (nuxtApp) => {
  const token = useFirebaseToken()

  if (!token.value) return

  const auth = useServerAuth()!

  try {
    await auth.verifySessionCookie(token.value)
  } catch (error) {
    console.error("Can't verify session:", error)
  }
})
