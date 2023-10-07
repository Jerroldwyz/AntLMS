import { ValidationError, number, object, string } from "yup"
import { createManager } from "~/server/utils/db/admin"

export default defineEventHandler(async (event) => {
  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodyType = object({
    name: string().required(),
    email: string().email().required(),
    roleId: number().optional().min(1),
  })
  let name, email, roleId

  // Validate
  try {
    const body = await requestBodyType.validate(unvalidatedBody, {
      abortEarly: false,
    })
    name = body.name
    email = body.email
    roleId = body.roleId
  } catch (e) {
    const error = e as unknown as ValidationError
    console.log(error)
    throw createError({
      statusCode: 400,
      statusMessage: `Bad request body: ${JSON.stringify(error.errors)}`,
      cause: error.errors,
    })
  }

  // Query DB
  try {
    return await createManager(name, email, roleId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
