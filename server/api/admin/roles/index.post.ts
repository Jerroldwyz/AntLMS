// import { parseParams } from "~/server/utils/validation/validator"
import { object, string, number, array, ValidationError } from "yup"
import { createRole } from "~/server/utils/db/admin"

export default defineEventHandler(async (event) => {
  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodyType = object({
    name: string().required(),
    permission_ids: array().required().of(number().required().min(1)),
  })
  let name, permission_ids

  // Validate
  try {
    const body = await requestBodyType.validate(unvalidatedBody, {
      abortEarly: false,
    })
    name = body.name
    permission_ids = body.permission_ids
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
    return await createRole(name, permission_ids)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
