export default defineEventHandler(async (event) => {
  const uuid = getRouterParam(event, "uuid")
  // TODO fix hardcoded jpg
  const path = `videos/${uuid}.jpg`
  const presignedUrl = await generatePresignedUrl(path)
  return { success: true, presignedUrl }
})
