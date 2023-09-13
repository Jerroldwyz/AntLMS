export default defineEventHandler(async (event) => {
  const query = await getQuery(event)

  const course = await getCreatorCourseById(parseInt(query.courseId as string))

  return mycourseTransformer(course)
})
