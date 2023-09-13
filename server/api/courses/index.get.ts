export default defineEventHandler(async (event) => {
  // TODO: This line is never used
  // const query = await getQuery(event)
  return await getCourses()
})
