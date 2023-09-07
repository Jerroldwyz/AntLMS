import { generatePresignedUrl } from "~~/server/utils/backend-s3-helpers"

export default defineEventHandler(async (event) => {
  const { path } = await readBody(event)
  // TODO, fix hardcoded bucket name
  const presignedUrl = await generatePresignedUrl("antlms", path, 3600)
  return { success: true, presignedUrl }
})
