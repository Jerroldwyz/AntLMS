export default defineEventHandler(async (event) => {
  const topicId = getRouterParam(event, "id")
  try {
    return await deleteTopic(parseInt(topicId as string))
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
