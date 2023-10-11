import { InferType, number } from "yup"
import { getRolePermissionMappings } from "~/server/utils/db/admin"
import { validateAndParse } from "~/server/utils/validation/validator"

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

  // Query DB
  try {
    const roleId = id
    return await getRolePermissionMappings(roleId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
