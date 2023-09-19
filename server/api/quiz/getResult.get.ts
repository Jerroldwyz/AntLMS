export default defineEventHandler(async (event) => {
  const query = await getQuery(event)

  try {
    return await getQuizResult(
      query.userId as string,
      parseInt(query.quizId as string),
    )
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
