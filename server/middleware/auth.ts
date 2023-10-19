import { getApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { useFirebaseAdmin } from "~/composables/useFirebaseAdmin.server"

export default defineEventHandler(async (event) => {
  const { req } = event.node
  const cookieOptions = useRuntimeConfig().public.firebaseAuthCookie
  if (req.url?.includes("/api/auth/")) {
    return
  }

  if (req.url?.includes("/api/")) {
    const token = getCookie(event, `${cookieOptions.name}-token`) || ""
    const app = useFirebaseAdmin()!
    const auth = getAuth(app)
    try {
      await auth.verifyIdToken(token, true)
    } catch (error) {
      console.error(error)
      throw createError({
        statusCode: 400,
        statusMessage: "Unauthorized",
      })
    }
  }
})
