export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const path = body.path
    await deleteFile(path as string)
    return { success: true }
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
