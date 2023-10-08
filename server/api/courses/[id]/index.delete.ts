export default defineEventHandler(async (event) => {
  // TODO add logic to ensure a user can only change their own course
  const id = getRouterParam(event, "id")

  try {
    const course = await deleteCourse(parseInt(id as string))
    return courseTransformer(course)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
