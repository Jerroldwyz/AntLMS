export default defineEventHandler(async (event) => {
  // TODO add logic to ensure a user can only change their own course
  const id = getRouterParam(event, "id")

  try {
    return await deleteCourseById(parseInt(id as string))
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
