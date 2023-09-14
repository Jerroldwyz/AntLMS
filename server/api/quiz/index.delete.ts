export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const quiz = await deleteQuiz(parseInt(body.quizId as string))

    return quizTransformer(quiz)
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
