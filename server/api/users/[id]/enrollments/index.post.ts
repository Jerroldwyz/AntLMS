export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const userUid = getRouterParam(event, "id")
  const courseId = body.courseId

  console.log(body)
  console.log(`${userUid}, ${courseId}`)

  try {
    return await enrollUser(userUid as string, parseInt(courseId as string))
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
