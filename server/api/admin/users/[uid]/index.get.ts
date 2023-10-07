import { ValidationError, object, string } from "yup"

export default defineEventHandler(async (event) => {
  // Route params
  const unvalidatedRouterParams = getRouterParams(event)
  const routerParamsType = object({
    uid: string().required().uuid(),
  })
  let managerId

  // Validation
  try {
    const routerParams = await routerParamsType.validate(
      unvalidatedRouterParams,
    )
    managerId = routerParams.uid
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
    return await getManagerById(managerId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
