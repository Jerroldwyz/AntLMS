import { FirebaseError } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { InferType, object, string } from "yup"
import { useFirebaseAdmin } from "~/composables/useFirebaseAdmin.server"

export default defineEventHandler(async (event) => {
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    email: string().required().email(),
  })

  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  try {
    const app = useFirebaseAdmin()!
    const auth = getAuth(app)

    const actionCodeSettings = {
      url: "http://localhost:3000/auth/login",
    }

    return await auth.generateEmailVerificationLink(
      body.email,
      actionCodeSettings,
    )
  } catch (e) {
    const error = e as unknown as FirebaseError
    throw createError({
      statusCode: 500,
      statusMessage: `Firebase admin: ${JSON.stringify(error.message)}`,
    })
  }
})
