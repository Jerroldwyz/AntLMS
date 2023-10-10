export default defineEventHandler(async (event) => {
  const contentId = getRouterParam(event, "id")

  try {
    const content = await getContentById(parseInt(contentId as string))
    return contentTransformer(content)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
