export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const prismaData = camelCaseToUnderscore(body)

  try {
    const content = await createContent(prismaData)
    return contentTransformer(content)
  } catch (e) {
    console.log(e)

    return sendError(event, prismaErrorHandler(e))
  }
})
