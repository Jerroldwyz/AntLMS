export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const query = getQuery(event)

  try {
    const course = await getCourseById(parseInt(id as string))
    return courseTransformer(course, query.userId as string)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
