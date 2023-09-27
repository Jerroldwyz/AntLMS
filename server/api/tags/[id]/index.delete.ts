export default defineEventHandler(async (event) => {
  const tagId = getRouterParam(event, "id")
  return await deleteTag(parseInt(tagId as string))
})
