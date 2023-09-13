export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  return await getCreatorCourses(query.userId as string)
})
