export default defineEventHandler(async (event) => {
  const quizId = getRouterParam(event, "id")
  const body = await readBody(event)

  try {
    const result = resultTransformer(await evaluateQuiz(body.result))

    if (body.quizScoreId !== undefined) {
      await storeExistingQuizResult(result, body.quizScoreId)
    } else {
      await storeQuizResult(
        result,
        parseInt(body.enrollmentId),
        body.userId as string,
        parseInt(body.quizId),
      )
    }

    return result
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})