import { InferType, array, number, object } from "yup"
import { updateRolePermissionMappings } from "~/server/utils/db/admin"

export default defineEventHandler(async (event) => {
  // Route params
  const unvalidatedId = getRouterParam(event, "id")
  const IdSchema = number().required().min(1)
  type IdType = InferType<typeof IdSchema>
  const id = await validateAndParse<IdType>({
    schema: IdSchema,
    value: unvalidatedId,
    msgOnError: "Bad request router params",
  })

  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    permission_ids: array().required().of(number().required().min(1)),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  // Query data from Database
  try {
    const roleId = id
    const permissionIds = body.permission_ids
    return await updateRolePermissionMappings(roleId, permissionIds)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
