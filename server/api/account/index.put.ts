export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const user = body

  try {
    return await updateAccount(user.userId, user.contactDetails)
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
