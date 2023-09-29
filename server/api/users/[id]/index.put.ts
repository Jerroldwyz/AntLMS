export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id")
  const body = await readBody(event)
  const contactDetails = body.contact_details
  const thumbnail = body.thumbnail
  const name = body.name

  try {
    return await updateUser(userId as string, name, thumbnail, contactDetails)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
