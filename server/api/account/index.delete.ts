export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { userId } = body

  try {
    return await deleteAccount(userId)
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
