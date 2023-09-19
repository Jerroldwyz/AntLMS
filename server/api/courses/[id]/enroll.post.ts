export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    return await enrollUser(parseInt(body.courseId), body.userId as string)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
