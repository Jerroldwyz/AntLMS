export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const userUid = getRouterParam(event, "id")
  const courseId = body.courseId

  try {
    return await unenrollUser(userUid as string, parseInt(courseId as string))
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
