export default defineEventHandler(async (event) => {
  const body = getQuery(event)

  try {
    const topic = await getTopics(parseInt(body.courseId as string))
    return topicsTransformer(topic)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
