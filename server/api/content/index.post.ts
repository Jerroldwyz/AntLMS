export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const prismaData = camelCaseToUnderscore(body)

  try {
    return await createContent(prismaData)
  } catch (e) {
    console.log(e)

    return sendError(event, prismaErrorHandler(e))
  }
})
