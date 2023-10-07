import { v4 as uuidv4 } from "uuid"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const path = body.path

  try {
    const fileType = body.fileType
    const path = `images/${uuidv4()}.${fileType}`
    const presignedUrl = await generatePresignedUrlPUT(path)
    return { success: true, presignedUrl, path }
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
