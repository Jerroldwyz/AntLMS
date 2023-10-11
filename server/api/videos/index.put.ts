import { InferType, object, string } from "yup"
import { v4 as uuidv4 } from "uuid"
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

  const name = body.name
  const path = `videos/${uuidv4()}-${name}`
  const presignedUrl = await generatePresignedUrlPUT(path)
  return { success: true, presignedUrl, path }
})
