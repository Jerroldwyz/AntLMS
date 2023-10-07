export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    return await deleteCourseById(parseInt(body.courseId as string))
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
