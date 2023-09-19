export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id")

  try {
    return await deleteUser(userId as string)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
