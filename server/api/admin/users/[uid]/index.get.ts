export default defineEventHandler(async (event) => {
  const managerId = getRouterParam(event, "uid")

  try {
    return await getManagerById(managerId as string)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
