export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")

  try {
    const course = await getCreatorCourseById(parseInt(id as string))
    return mycourseTransformer(course)
  } catch (e) {
    console.log(e)

    return sendError(event, prismaErrorHandler(e))
  }
})
