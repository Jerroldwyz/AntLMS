import { ValidationError, number, object } from "yup"
import { deleteRolePermissionMapping } from "~/server/utils/db/admin"

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
    permission_id: number().required().min(1),
  })
  let permissionId

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
    permissionId = body.permission_id
  } catch (e) {
    const error = e as unknown as ValidationError
    throw createError({
      statusCode: 400,
      statusMessage: `Bad Request body params: ${JSON.stringify(error.errors)}`,
    })
  }

  // Query database
  try {
    return await deleteRolePermissionMapping(roleId, permissionId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
