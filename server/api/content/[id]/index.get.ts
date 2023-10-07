export default defineEventHandler(async (event) => {
  const contentId = getRouterParam(event, "id")

  try {
    return await getContentById(parseInt(contentId as string))
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
