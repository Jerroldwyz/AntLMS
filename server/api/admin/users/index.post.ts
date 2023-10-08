import { InferType, number, object, string } from "yup"
import { createManager } from "~/server/utils/db/admin"

export default defineEventHandler(async (event) => {
  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    name: string().required(),
    email: string().email().required(),
    roleId: number().optional().min(1),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  // Query DB
  try {
    const { name, email, roleId } = body
    return await createManager(name, email, roleId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
