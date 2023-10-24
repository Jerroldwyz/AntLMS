import { getAuth } from "firebase-admin/auth"
import { InferType, object, string } from "yup"
import { useFirebaseAdmin } from "~/composables/useFirebaseAdmin.server"

export default defineEventHandler(async (event) => {
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    session_cookie: string().optional(),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  const { session_cookie } = body

  let res = {
    authenticated: false,
    admin: false,
  }
  const app = useFirebaseAdmin()!
  const auth = getAuth(app)

  if (session_cookie) {
    try {
      const decodedToken = await auth.verifySessionCookie(session_cookie, true)
      res.authenticated = true
      if (decodedToken.admin) {
        res.admin = true
      }
    } catch (error) {
      res = {
        authenticated: false,
        admin: false,
      }
    }
  }

  return res
})
