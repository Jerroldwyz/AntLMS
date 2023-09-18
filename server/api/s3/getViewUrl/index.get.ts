export default defineEventHandler(async (event) => {
  const query = await getQuery(event)
  const path = query.path
  // TODO, fix hardcoded bucket name
  const presignedUrl = await generatePresignedUrl(path)
  return { success: true, presignedUrl }
})
