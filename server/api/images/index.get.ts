export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  try {
    const path = query.path
    const presignedUrl = await generatePresignedUrl(path as string)
    return { success: true, presignedUrl }
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
