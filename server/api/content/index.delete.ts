export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return await deleteContent(parseInt(body.contentId as string))
})
