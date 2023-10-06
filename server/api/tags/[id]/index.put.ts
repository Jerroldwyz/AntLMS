export default defineEventHandler(async (event) => {
  const tagId = getRouterParam(event, "id")
  const body = await readBody(event)
  return await updateTag(parseInt(tagId as string), body.name as string)
})
