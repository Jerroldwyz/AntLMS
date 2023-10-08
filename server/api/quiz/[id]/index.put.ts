export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const quizId = getRouterParam(event, "id")
  const quiz_data = camelCaseToUnderscore(body)
  try {
    const quiz = await updateQuiz(parseInt(quizId as string), quiz_data)

    return quizTransformer(quiz)
  } catch (e) {
    console.log(e)

    return sendError(event, prismaErrorHandler(e))
  }
})
