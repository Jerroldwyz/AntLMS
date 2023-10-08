export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const course = camelCaseToUnderscore(body)
  try {
    const mycourse = await createCourse(course)
    return courseTransformer(mycourse)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
