export default defineEventHandler(async (event) => {
  const { id } = event.context.params

  try {
    return await getTopicById(parseInt(id as string))
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
