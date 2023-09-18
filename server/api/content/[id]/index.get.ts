export default defineEventHandler(async (event) => {
  const contentId = getRouterParam(event, "id")

  return await getContentById(parseInt(contentId as string))
})
