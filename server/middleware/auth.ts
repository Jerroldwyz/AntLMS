import { getApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { useFirebaseAdmin } from "~/composables/useFirebaseAdmin.server"

export default defineEventHandler(async (event) => {
  const appConfig = useRuntimeConfig()
  if (appConfig.public.application === "development") {
  } else {
    const { req, res } = event.node
    const cookieOptions = useRuntimeConfig().public.firebaseAuthCookie
    if (
      req.url?.includes("/api/signin") ||
      req.url?.includes("/api/session") ||
      req.url?.includes("/api/signup") ||
      req.url?.includes("/api/signout")
    ) {
      return
    }
    if (req.url?.includes("/api/")) {
      const token = getCookie(event, `${cookieOptions.name}-token`) || ""
      const app = useFirebaseAdmin()!
      const auth = getAuth(app)
      try {
        const result = await auth.verifySessionCookie(token, true)
      } catch (error) {
        console.error(error)
        throw createError({
          statusCode: 400,
          statusMessage: "Session cookie is invalid or you're not logged in",
        })
      }
    }
  }
})
