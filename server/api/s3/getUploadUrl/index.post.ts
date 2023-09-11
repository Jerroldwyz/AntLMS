export default defineEventHandler(async (event) => {
  const { fileName, type } = await readBody(event)
  const path = `${type}/${fileName}`
  // TODO, fix hardcoded bucket name
  const presignedUrl = await generatePresignedUrlPUT("antlms", path, 3600)
  return { success: true, presignedUrl, path }
})
