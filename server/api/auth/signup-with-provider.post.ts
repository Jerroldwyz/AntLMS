import { InferType, string, object, bool } from "yup"
import { createUser } from "~/server/utils/db/users"

export default defineEventHandler(async (event) => {
  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    uid: userIdSchema(),
    name: string().required().min(1),
    email: string().required().email(),
    thumbnail: string().nullable().optional().default(null),
    contactDetails: object().optional().default({}),
    isAdmin: bool().optional().default(false),
    enabled: bool().optional().default(true),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  // Create user in local database
  try {
    await createUser(camelCaseToUnderscore(body))
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
