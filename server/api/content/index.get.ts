export default defineEventHandler(async (event) => {
  const query = await getQuery(event)

  try {
    return await getContentById(parseInt(query.contentId as string))
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
