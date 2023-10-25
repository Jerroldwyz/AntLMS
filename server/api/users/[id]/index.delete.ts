import { getAuth } from "firebase-admin/auth"
import { InferType, string } from "yup"
import { deleteUser } from "~/server/utils/db/users"
import { useFirebaseAdmin } from "~/composables/useFirebaseAdmin.server"
import { userIdSchema } from "~/server/utils/userIdSchema"

export default defineEventHandler(async (event) => {
  // Route params
  const unvalidatedId = getRouterParam(event, "id")
  const IdSchema = userIdSchema()
  type IdType = InferType<typeof IdSchema>
  const id = await validateAndParse<IdType>({
    schema: IdSchema,
    value: unvalidatedId,
    msgOnError: "Bad request router params",
  })

  let data
  const userId = id
  try {
    data = await deleteUser(userId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }

  try {
    const app = useFirebaseAdmin()
    const auth = getAuth(app)
    await auth.deleteUser(userId as string)
  } catch (e) {
    console.log(e)
  }

  return data
})
