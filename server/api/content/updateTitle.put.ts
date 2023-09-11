export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return await updateTitle(
    parseInt(body.contentId as string),
    body.title as string
  )
})
