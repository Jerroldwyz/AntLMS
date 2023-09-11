export default defineEventHandler(async (event) => {
  const query = await getQuery(event)

  return await getEnrollment(query.userId as string)
})
