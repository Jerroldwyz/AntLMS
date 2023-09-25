export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")

  const course = await getCreatorCourseById(parseInt(id as string))

  try {
    return mycourseTransformer(course)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
