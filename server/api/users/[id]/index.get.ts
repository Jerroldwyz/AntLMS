export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id")

  try {
    return await getUserById(userId as string)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
