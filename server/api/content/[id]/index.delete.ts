export default defineEventHandler(async (event) => {
  const contentId = getRouterParam(event, "id")
  try {
    return await deleteContent(parseInt(contentId as string))
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
