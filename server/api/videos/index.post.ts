import { v4 as uuidv4 } from "uuid"
import { InferType, object, string } from "yup"
import { generatePresignedUrlPUT } from "~/server/utils/backend-s3-helpers"

export default defineEventHandler(async (event) => {
  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    name: string().required(),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  try {
    const fileName = body.name
    const path = `videos/${uuidv4()}.${fileName}`
    const presignedUrl = await generatePresignedUrlPUT(path)
    return { success: true, presignedUrl, path }
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
