export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const courseId = body.courseId
  const userId = body.userId

  try {
    return await enrollUser(userId as string, parseInt(courseId as string))
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
