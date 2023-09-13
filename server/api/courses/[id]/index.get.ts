export default defineEventHandler(async (event) => {
  const { id } = getRouterParam(event, "id")
  const query = getQuery(event)

  const course = await getCourseById(parseInt(id))

  return courseTransformer(course, query.userId as string)
})
