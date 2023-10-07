export default defineEventHandler(async (event) => {
  const topicId = getRouterParam(event, "id")
  try {
    return await getTopicById(parseInt(topicId as string))
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
