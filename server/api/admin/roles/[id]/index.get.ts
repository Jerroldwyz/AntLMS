import { ValidationError, number, object } from "yup"
import { getRoleById } from "~/server/utils/db/admin"

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

  let data
  try {
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
