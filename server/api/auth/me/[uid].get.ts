import { InferType, object, string } from "yup"
import { getAuth } from "firebase-admin/auth"
import { createUser } from "../../../utils/db/users"
import { userIdSchema } from "~/server/utils/userIdSchema"
import { useFirebaseAdmin } from "~/composables/useFirebaseAdmin.server"

export default defineEventHandler(async (event) => {
  const unvalidatedId = getRouterParam(event, "uid")
  const IdSchema = userIdSchema()
  type IdType = InferType<typeof IdSchema>
  const uid = await validateAndParse<IdType>({
    schema: IdSchema,
    value: unvalidatedId,
    msgOnError: "Bad request router params",
  })

  let signInUser

  try {
    signInUser = await getUserById(uid)
    if (signInUser) {
      return signInUser
    }
  } catch (e) {
    throw prismaErrorHandler(e)
  }

  try {
    const app = useFirebaseAdmin()!
    const auth = getAuth(app)
    signInUser = await auth.getUser(uid)
    if (signInUser) {
      const newUser = {
        uid: signInUser.uid,
        name: signInUser.displayName,
        email: signInUser.email,
        contact_details: {},
      }
      return await createUser(camelCaseToUnderscore(newUser))
    }
  } catch (error) {}

  if (signInUser === null) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    })
  }
})
