export default defineEventHandler(async (event) => {
  const contentId = getRouterParam(event, "id")
  try {
    return await deleteContent(parseInt(contentId as string))
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
