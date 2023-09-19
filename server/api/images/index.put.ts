export default defineEventHandler(async (event) => {
  const { fileType } = await readBody(event)
  const body = await readBody(event)
  const path = body.path

  const presignedUrl = await generatePresignedUrlPUT(path)
  return { success: true, presignedUrl, path }
})
