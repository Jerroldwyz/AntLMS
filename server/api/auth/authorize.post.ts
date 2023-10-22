import { getAuth } from "firebase-admin/auth"
import { InferType, object, string } from "yup"
import { useFirebaseAdmin } from "~/composables/useFirebaseAdmin.server"

export default defineEventHandler(async (event) => {
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    session_cookie: string().required(),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  const { session_cookie } = body

  const app = useFirebaseAdmin()!
  const auth = getAuth(app)

  try {
    const decodeToken = await auth.verifySessionCookie(session_cookie)
    return decodeToken.admin
  } catch (e) {
    throw createError({
      statusCode: "401",
      statusMessage: "Unauthorized",
    })
  }
})
