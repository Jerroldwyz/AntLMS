import { v4 as uuidv4 } from "uuid"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const fileType = body.fileType
    const path = `videos/${uuidv4()}.${fileType}`
    const presignedUrl = await generatePresignedUrlPUT(path)
    return { success: true, presignedUrl, path }
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
