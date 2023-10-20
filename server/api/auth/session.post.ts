import { getAuth } from "firebase-admin/auth"
import { useFirebaseAdmin } from "~/composables/useFirebaseAdmin.server"

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event)
  const cookieOptions = useRuntimeConfig().public.firebaseAuthCookie

  if (token && token.length > 0) {
    const app = useFirebaseAdmin()!
    const auth = getAuth(app)
    // check user existed in local database
    const decodedToken = await auth.verifyIdToken(token)
    const uid = decodedToken.uid

    const expiresIn = 60 * 60 * 24 * 1000
    const sessionCookie = await auth.createSessionCookie(token, { expiresIn })

    setCookie(event, `${cookieOptions.name}-token`, sessionCookie, {
      domain: cookieOptions.domain,
      maxAge: expiresIn ?? 0,
      path: cookieOptions.path,
      sameSite: cookieOptions.sameSite as boolean | "lax" | "strict" | "none",
    })
  } else {
    deleteCookie(event, `${cookieOptions.name}-token`, {
      maxAge: -1,
    })
  }

  return { success: true }
})
