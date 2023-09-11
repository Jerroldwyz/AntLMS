export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return await deleteTopic(parseInt(body.topicId as string))
})
