export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const prismaData = camelCaseToUnderscore(body)

  try {
    const quiz = await createQuiz(prismaData)

    return quizTransformer(quiz)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
