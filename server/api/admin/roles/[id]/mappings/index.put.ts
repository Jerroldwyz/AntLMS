import { ValidationError, array, number, object } from "yup"
import { updateRolePermissionMappings } from "~/server/utils/db/admin"

export default defineEventHandler(async (event) => {
  // Route params
  const unvalidatedRouterParams = getRouterParams(event)
  const routerParamsType = object({
    id: number().required().min(1),
  })
  let roleId

  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodyType = object({
    permission_ids: array().required().of(number().required().min(1)),
  })
  let permissionIds

  // Validation
  try {
    const routerParams = await routerParamsType.validate(
      unvalidatedRouterParams,
    )
    roleId = routerParams.id
  } catch (e) {
    const error = e as unknown as ValidationError
    throw createError({
      statusCode: 400,
      statusMessage: `Bad Request router params: ${JSON.stringify(
        error.errors,
      )}`,
    })
  }
  try {
    const body = await requestBodyType.validate(unvalidatedBody)
    permissionIds = body.permission_ids
  } catch (e) {
    const error = e as unknown as ValidationError
    throw createError({
      statusCode: 400,
      statusMessage: `Bad Request body params: ${JSON.stringify(error.errors)}`,
    })
  }

  // Query data from Database
  try {
    return await updateRolePermissionMappings(roleId, permissionIds)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
