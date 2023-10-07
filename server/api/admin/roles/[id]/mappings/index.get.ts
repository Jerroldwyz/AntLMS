import { ValidationError, number, object } from "yup"
import { getRolePermissionMappings } from "~/server/utils/db/admin"

export default defineEventHandler(async (event) => {
  // Route params
  const unvalidatedRouterParams = getRouterParams(event)
  const routerParamsType = object({
    id: number().required().min(1),
  })
  let roleId

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

  // Query DB
  try {
    return await getRolePermissionMappings(roleId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
