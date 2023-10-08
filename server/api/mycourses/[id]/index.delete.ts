export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")

  try {
    const mycourse = await deleteCourse(parseInt(id as string))
    return mycourseTransformer(mycourse)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
