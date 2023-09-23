export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const body = await readBody(event)

  try {
    if (body.enabled !== undefined) {
      if (body.enabled === true) {
        return await enableCourseById(parseInt(id as string))
      } else {
        return await disableCourseById(parseInt(id as string))
      }
    }

    return "Nothing to do"
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
