export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const prismaQuery = camelCaseToUnderscore(body)

  try {
    const topic = await createTopic(prismaQuery)
    return topicsTransformer(topic)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
