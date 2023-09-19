export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  const query = getQuery(event)

  const course = await getCourseById(parseInt(id))

  try {
    return courseTransformer(course, query.userId as string)
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
