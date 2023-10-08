export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    const course = await getCreatorCourses(query.userId as string)
    return mycourseTransformer(course)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
