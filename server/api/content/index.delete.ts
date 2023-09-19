export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    return await deleteContent(parseInt(body.contentId as string))
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
