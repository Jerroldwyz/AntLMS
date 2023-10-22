import { UserRecord, getAuth } from "firebase-admin/auth"
import { InferType, object } from "yup"
import { createUser } from "~/server/utils/db/users"
import { useFirebaseAdmin } from "~/composables/useFirebaseAdmin.server"

export default defineEventHandler(async (event) => {
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    uid: userIdSchema(),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  const { uid } = body

  const app = useFirebaseAdmin()!
  const auth = getAuth(app)

  const existedFirebaseUser = await auth.getUser(uid)
  if (!existedFirebaseUser) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    })
  }

  const existedLocalUser = await getUserById(uid)

  if (existedLocalUser) {
    return existedLocalUser
  } else {
    let isAdmin: boolean = false
    if (existedFirebaseUser.customClaims) {
      if (existedFirebaseUser.customClaims.admin) {
        isAdmin = true
      }
    }
    const newUser = {
      uid: existedFirebaseUser.uid,
      name: existedFirebaseUser.displayName,
      email: existedFirebaseUser.email,
      thumbnail: null,
      contact_details: {},
      is_admin: isAdmin,
      enabled: !existedFirebaseUser.disabled,
    }

    return await createUser(camelCaseToUnderscore(newUser))
  }
})
