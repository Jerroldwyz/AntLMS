export default defineEventHandler(async (event) => {
  const tagId = getRouterParam(event, "id")
  return await getTagById(parseInt(tagId as string))
})
