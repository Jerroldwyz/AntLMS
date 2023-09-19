export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  // TODO fix hardcoded jpg
  const path = query.path
  const presignedUrl = await generatePresignedUrl(path)
  return { success: true, presignedUrl }
})
