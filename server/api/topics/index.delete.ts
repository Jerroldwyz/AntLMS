export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    return await deleteTopic(parseInt(body.topicId as string))
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
