export default defineEventHandler(async (event) => {
  const query = await getQuery(event)

  try {
    const course = await getCreatorCourseById(
      parseInt(query.courseId as string),
    )

    return mycourseTransformer(course)
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
