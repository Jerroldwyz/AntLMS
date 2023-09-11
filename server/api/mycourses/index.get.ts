export default defineEventHandler(async (event) => {
  const query = await getQuery(event)

  const course = await getCourseById(parseInt(query.courseId as string))

  console.log(course)

  return mycourseTransformer(course)
})
