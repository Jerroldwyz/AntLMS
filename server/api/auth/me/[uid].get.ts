import { InferType, object, string } from "yup"
import { userIdSchema } from "~/server/utils/userIdSchema"

export default defineEventHandler(async (event) => {
  const unvalidatedId = getRouterParam(event, "uid")
  const IdSchema = userIdSchema()
  type IdType = InferType<typeof IdSchema>
  const uid = await validateAndParse<IdType>({
    schema: IdSchema,
    value: unvalidatedId,
    msgOnError: "Bad request router params",
  })

  try {
    const signInUser = await getUserById(uid)
    if (signInUser) {
      return signInUser
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      })
    }
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
