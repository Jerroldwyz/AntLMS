export default defineEventHandler(async (event) => {
  const uuid = getRouterParam(event, "uuid")
  // TODO fix jpg hardcoding
  const path = `videos/${uuid}.jpg`
  await deleteFile(path)
  return { success: true }
})
