export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id")
  const body = await readBody(event)
  const contactDetails = body.contactDetails

  return await updateUser(userId as string, contactDetails)
})
