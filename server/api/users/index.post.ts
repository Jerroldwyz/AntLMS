import { InferType, string, object, bool } from "yup"
import { v4 as uuidv4 } from "uuid"
import { createUser } from "~/server/utils/db/users"

export default defineEventHandler(async (event) => {
  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    uid: string()
      .optional()
      .uuid()
      .default(() => uuidv4()),
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

  try {
    return await createUser(camelCaseToUnderscore(body))
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
