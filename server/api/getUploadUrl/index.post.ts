import { generatePresignedUrlPUT } from "~~/server/s3/helpers"

export default defineEventHandler(async (event) => {
  const { fileName } = await readBody(event)
  return generatePresignedUrlPUT("antlms", fileName, 3600)
})
