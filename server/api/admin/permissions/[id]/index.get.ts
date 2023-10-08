import { InferType, number } from "yup"
import { getPermissionById } from "~/server/utils/db/admin"
import { validateAndParse } from "~/server/utils/validation/validator"

export default defineEventHandler(async (event) => {
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
    const permissionId = id
    data = await getPermissionById(permissionId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }

  if (data === null) {
    throw createError({
      statusCode: 404,
      statusMessage: "Permission ID does not exist",
    })
  }
  return data
})
