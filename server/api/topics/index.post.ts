export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const prismaQuery = camelCaseToUnderscore(body)

  try {
    return await createTopic(prismaQuery)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
