export default defineEventHandler(async (event) => {
  const quizId = getRouterParam(event, "id")
  try {
    const quiz = await getQuizById(parseInt(quizId as string))
    return quizTransformer(quiz)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})