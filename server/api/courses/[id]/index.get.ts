export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const query = getQuery(event)

  const course = await getCourseById(parseInt(id as string))

  if (!course) {
    throw createError({
      statusCode: 404,
      statusMessage: "Course not found",
    })
  }

  try {
    return courseTransformer(course, query.userId as string)
  } catch (e) {
    console.log(e)
    return sendError(event, prismaErrorHandler(e))
  }
})
