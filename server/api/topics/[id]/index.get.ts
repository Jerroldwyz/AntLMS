export default defineEventHandler(async (event) => {
  const topicId = getRouterParam(event, "id")
  return await getTopicById(parseInt(topicId as string))
})
