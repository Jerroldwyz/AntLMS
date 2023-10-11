import { object, string, number, array, InferType } from "yup"
import { validateAndParse } from "~/server/utils/validation/validator"
import { createRole } from "~/server/utils/db/admin"

export default defineEventHandler(async (event) => {
  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    name: string().required(),
    permission_ids: array().required().of(number().required().integer().min(1)),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  // Query DB
  try {
    const name = body.name
    const permissionIds = body.permission_ids
    return await createRole(name, permissionIds)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
