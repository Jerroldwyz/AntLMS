export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  try {
    return await deleteCourse(parseInt(id as string))
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
