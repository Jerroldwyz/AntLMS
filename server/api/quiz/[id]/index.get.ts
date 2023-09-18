export default defineEventHandler(async (event) => {
  const quizId = getRouterParam(event, "id")

  const quiz = await getQuizById(parseInt(quizId as string))

  return quizTransformer(quiz)
})
