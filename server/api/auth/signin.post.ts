import { InferType, bool, object, string } from "yup"
import { createUser } from "~/server/utils/db/users"

export default defineEventHandler(async (event) => {
  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    uid: string().required().uuid(),
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

  let signInUser
  try {
    signInUser = await getUserById(body.uid)
    if (signInUser) {
      return signInUser
    } else {
      return await createUser(camelCaseToUnderscore(body))
    }
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
