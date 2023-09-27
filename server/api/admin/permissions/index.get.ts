export default defineEventHandler(async (event) => {
  try {
    return await getPermissions()
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
