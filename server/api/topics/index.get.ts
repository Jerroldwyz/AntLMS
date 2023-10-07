export default defineEventHandler(async (event) => {
  const body = getQuery(event)

  try {
    return await getTopics(parseInt(body.courseId as string))
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
