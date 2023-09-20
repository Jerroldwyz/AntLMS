export default defineEventHandler(async (event) => {
  const quizId = getRouterParam(event, "id")
  const query = await getQuery(event)

  try {
    return await getQuizResult(
      query.userId as string,
      parseInt(quizId as string),
    )
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
