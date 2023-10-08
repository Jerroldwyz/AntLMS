import { ValidationError, number } from "yup"
import { getPermissionById } from "~/server/utils/db/admin"
import { validateAndParse } from "~/server/utils/validation/validator"

export default defineEventHandler(async (event) => {
  const unvalidatedId = getRouterParam(event, "id")
  const IdSchema = number().required().min(1)

  const id = await validateAndParse({
    schema: IdSchema,
    value: unvalidatedId,
    msgOnError: "Bad request router params",
  })

  let data
  try {
    data = await getPermissionById(id)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
  if (data === null) {
    throw createError({
      statusCode: 404,
      statusMessage: "Permission ID does not exist",
    })
  }

  return data
})
