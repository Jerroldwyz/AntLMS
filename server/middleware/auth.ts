import { getApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

export default defineEventHandler(async (event) => {
  const { req, res } = event.node
  const cookieOptions = useRuntimeConfig().public.firebaseAuthCookie

  if (
    req.url?.includes("/api/signin") ||
    req.url?.includes("/api/session") ||
    req.url?.includes("/api/signup")
  ) {
    return
  }

  if (req.url?.includes("/api/")) {
    const token = getCookie(event, `${cookieOptions.name}-token`) || ""
    const app = getApp()
    const auth = getAuth(app)
    try {
      console.log(`[SERVER] Verifying token: ${token}`)
      await auth.verifyIdToken(token)
    } catch (error) {
      console.error(error)
      res.statusCode = 400
      res.end(
        "You must be signed in to view the protected content on this page",
      )
    }
  }
})
