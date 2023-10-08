import { InferType, number } from "yup"
import { getRoleById } from "~/server/utils/db/admin"

export default defineEventHandler(async (event) => {
  // Route params
  const unvalidatedId = getRouterParam(event, "id")
  const IdSchema = number().required().integer().min(1)
  type IdType = InferType<typeof IdSchema>
  const id = await validateAndParse<IdType>({
    schema: IdSchema,
    value: unvalidatedId,
    msgOnError: "Bad request router params",
  })

  let data
  try {
    const roleId = id
    data = await getRoleById(roleId)
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
