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

  let signInUser

  try {
    signInUser = await getUserById(uid)
    if (signInUser) {
      return signInUser
    }
  } catch (e) {
    throw prismaErrorHandler(e)
  }

  if (signInUser === null) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    })
  }
})
