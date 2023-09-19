export default defineEventHandler(async (event) => {
  const query = await getQuery(event)

  const course = await getCreatorCourseById(parseInt(query.courseId as string))

  try {
    return mycourseTransformer(course)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
