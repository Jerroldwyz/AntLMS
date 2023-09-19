export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const path = body.path

  try {
    const fileType = body.fileType
    const path = `images/${uuidv4()}.${fileType}`
    const presignedUrl = await generatePresignedUrlPUT(path)
    return { success: true, presignedUrl, path }
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
