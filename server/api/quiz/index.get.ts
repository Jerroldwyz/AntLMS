export default defineEventHandler(async (event) => {
  const query = await getQuery(event)

  try {
    const quiz = await getQuizById(parseInt(query.quizId as string))

    return quizTransformer(quiz)
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})