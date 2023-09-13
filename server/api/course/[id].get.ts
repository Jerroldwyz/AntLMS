export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  const query = getQuery(event)

  const course = await getCourseById(parseInt(id))

  return courseTransformer(course, query.userId as string)
})
