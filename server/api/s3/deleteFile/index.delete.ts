export default defineEventHandler(async (event) => {
  const { path } = await readBody(event)
  // TODO, fix hardcoded bucket name
  await deleteFile("antlms", path)
  return { success: true }
})
