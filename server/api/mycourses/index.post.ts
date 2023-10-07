export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const course = camelCaseToUnderscore(body)
  try {
    return await createCourse(course)
  } catch (e) {
    console.log(e)

    return sendError(event, prismaErrorHandler(e))
  }
})
