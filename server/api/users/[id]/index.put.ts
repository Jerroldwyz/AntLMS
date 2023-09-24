export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id")
  const body = await readBody(event)
  const contactDetails = body.contactDetails
  const thumbnail = body.thumbnail

  try {
    return await updateUser(userId as string, thumbnail, contactDetails)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
