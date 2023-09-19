export default defineEventHandler(async (event) => {
  const query = await getQuery(event)
  const { userId } = query

  try {
    return await getAccountById(userId as string)
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
