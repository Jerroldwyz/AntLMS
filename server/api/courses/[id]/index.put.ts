export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const query = getQuery(event)

  if (query.enabled) {
    if (query.enabled === true) {
      return await enableCourse(parseInt(id as string))
    } else {
      return await disableCourse(parseInt(id as string))
    }
  }

  return "Nothing to do"
})
