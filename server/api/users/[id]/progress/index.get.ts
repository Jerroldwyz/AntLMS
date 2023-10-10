export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id")
  const query = getQuery(event)
  const courseId = query.courseId
  console.log(courseId)

  try {
    return await getEnrollmentProgress(
      userId as string,
      parseInt(courseId as string),
    )
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
