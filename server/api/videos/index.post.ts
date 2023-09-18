import { v4 as uuidv4 } from "uuid"

export default defineEventHandler(async (event) => {
  const { fileType } = await readBody(event)

  // TODO need logic refinements
  const path = `videos/${uuidv4()}.${fileType}`
  const presignedUrl = await generatePresignedUrlPUT(path)
  return { success: true, presignedUrl, path }
})
