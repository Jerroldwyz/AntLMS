import { InferType, string, object } from "yup"
import { updateUserById } from "~/server/utils/db/users"

export default defineEventHandler(async (event) => {
  // Route params
  const unvalidatedId = getRouterParam(event, "id")
  const IdSchema = string().required().uuid()
  type IdType = InferType<typeof IdSchema>
  const id = await validateAndParse<IdType>({
    schema: IdSchema,
    value: unvalidatedId,
    msgOnError: "Bad request router params",
  })

  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    contactDetails: object().optional(),
    thumbnail: string().optional().min(1),
    name: string().optional().min(1),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  try {
    const userId = id
    return await updateUserById(userId, camelCaseToUnderscore(body))
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
