export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id")
  const body = await readBody(event)
  const contactDetails = body.contactDetails

  try {
    return await updateUser(userId as string, contactDetails)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
