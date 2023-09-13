export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const prismaData = {
    enrollment_id: parseInt(body.enrollmentId),
    content_id: parseInt(body.contentId),
    user_id: body.userId,
  }

  return await completeContent(prismaData)
})
