import { v4 as uuidv4 } from "uuid"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const fileName = body.name
    const path = `images/${uuidv4()}.${fileName}`
    const presignedUrl = await generatePresignedUrlPUT(path)
    return { success: true, presignedUrl, path }
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
