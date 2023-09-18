export default defineEventHandler(async (event) => {
  const { fileType } = await readBody(event)
  const uuid = getRouterParam(event, "uuid")
  // TODO
  const path = `images/${uuid}.${fileType}`
  const presignedUrl = await generatePresignedUrlPUT(path)
  return { success: true, presignedUrl, path }
})
