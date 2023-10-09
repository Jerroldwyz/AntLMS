import { InferType, bool, object, string } from "yup"
import { v4 as uuidv4 } from "uuid"
import { createUser } from "~/server/utils/db/users"

export default defineEventHandler(async (event) => {
  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    uid: string().optional().uuid(),
    name: string().required().min(1),
    email: string().required().email(),
    thumbnail: string().nullable().optional(),
    contactDetails: object().optional(),
    isAdmin: bool().optional(),
    enabled: bool().optional(),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  if (body.uid === undefined) {
    body.uid = uuidv4()
  }
  if (body.thumbnail === undefined) {
    body.thumbnail = null
  }
  if (body.contactDetails === undefined) {
    body.contactDetails = {}
  }
  if (body.isAdmin === undefined) {
    body.isAdmin = false
  }
  if (body.enabled === undefined) {
    body.enabled = true
  }

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
