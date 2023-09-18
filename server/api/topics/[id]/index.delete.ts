export default defineEventHandler(async (event) => {
  const topicId = getRouterParam(event, "id")
  return await deleteTopic(parseInt(topicId as string))
})
