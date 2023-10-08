export default defineEventHandler(async (event) => {
  const topicId = getRouterParam(event, "id")
  try {
    const topic = await getTopicById(parseInt(topicId as string))
    return topicsTransformer(topic)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
