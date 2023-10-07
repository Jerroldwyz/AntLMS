export default defineEventHandler(async (event) => {
  const quizId = getRouterParam(event, "id")

  try {
    const quiz = await deleteQuiz(parseInt(quizId as string))
    return quizTransformer(quiz)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
