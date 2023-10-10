export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const userUid = getRouterParam(event, "id")
  const courseId = body.courseId

  try {
    return await unenrollUser(userUid as string, parseInt(courseId as string))
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
