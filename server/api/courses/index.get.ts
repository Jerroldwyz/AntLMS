export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // all, enabled, disabled
  const status = query.status ?? "all"

  return await getAllCourses(status)
})
