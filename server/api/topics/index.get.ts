export default defineEventHandler(async (event) => {
  const body = await getQuery(event)
  return await getTopics(parseInt(body.courseId as string))
})
