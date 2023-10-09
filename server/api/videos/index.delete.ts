import { InferType, object, string } from "yup"
import { deleteFile } from "~/server/utils/backend-s3-helpers"

export default defineEventHandler(async (event) => {
  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    path: string().required(),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  try {
    const path = body.path
    await deleteFile(path)
    return { success: true }
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
