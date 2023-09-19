export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    return await updateContentPosition(
      parseInt(body.contentId as string),
      parseInt(body.contentPosition as string),
    )
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
