export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    return await deleteCourse(parseInt(body.courseId as string))
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
