export default defineEventHandler(async (event) => {
  const topicId = getRouterParam(event, "id")
  const body = await readBody(event)

  const title = body.title

  return await updateTopicTitle(parseInt(topicId as string), title as string)
})
