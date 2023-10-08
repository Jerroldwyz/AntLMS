export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const id = getRouterParam(event, "id")

  try {
    return await enrollUser(parseInt(id as string), body.userId as string)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
