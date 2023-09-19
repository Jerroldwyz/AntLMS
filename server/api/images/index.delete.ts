export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // TODO fix hardcoded jpg
  const path = body.path
  await deleteFile(path as string)
  return { success: true }
})
