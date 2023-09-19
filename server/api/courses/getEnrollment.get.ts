export default defineEventHandler(async (event) => {
  const query = await getQuery(event)

  try {
    return await getEnrollment(query.userId as string)
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
