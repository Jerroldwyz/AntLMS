import { InferType, string } from "yup"
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

  // Query DB
  let data
  try {
    const managerId = id
    data = await getManagerById(managerId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }

  if (data === null) {
    throw createError({
      statusCode: 404,
      statusMessage: "Role ID does not exist",
    })
  }
  return data
})
