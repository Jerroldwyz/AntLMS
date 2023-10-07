export default defineEventHandler(async (event) => {
  const body = await getQuery(event)

  try {
    return await getTopics(parseInt(body.courseId as string))
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
