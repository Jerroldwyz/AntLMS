export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    return await updateContent(
      parseInt(body.contentId as string),
      body.content as string,
    )
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
