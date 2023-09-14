export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    return await updateTopicTitle(
      parseInt(body.topicId as string),
      body.title as string,
    )
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
