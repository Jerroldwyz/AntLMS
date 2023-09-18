export default defineEventHandler(async (event) => {
  const contentId = getRouterParam(event, "id")
  return await deleteContent(parseInt(contentId as string))
})
