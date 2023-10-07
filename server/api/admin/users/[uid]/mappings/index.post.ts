import { ValidationError, object, string, number } from "yup"

export default defineEventHandler(async (event) => {
  // Route params
  const unvalidatedRouterParams = getRouterParams(event)
  const routerParamsType = object({
    uid: string().required().uuid(),
  })
  let managerId

  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodyType = object({
    roleId: number().required().min(1),
  })
  let roleId

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
    const body = await requestBodyType.validate(unvalidatedBody)
    roleId = body.roleId
  } catch (e) {
    const error = e as unknown as ValidationError
    throw createError({
      statusCode: 400,
      statusMessage: `Bad Request body params: ${JSON.stringify(error.errors)}`,
    })
  }

  try {
    return await createManagerRoleMapping(managerId as string, roleId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
