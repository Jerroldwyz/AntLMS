export default defineEventHandler(async (event) => {
  const body = await getQuery(event)

  try {
    return await getTopics(parseInt(body.courseId as string))
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
