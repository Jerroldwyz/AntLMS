export default defineEventHandler(async (event) => {
  const contentId = getRouterParam(event, "id")
  try {
    const content = await deleteContent(parseInt(contentId as string))
    return contentTransformer(content)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
