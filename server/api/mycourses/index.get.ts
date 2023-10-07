export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    return await getCreatorCourses(query.userId as string)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
