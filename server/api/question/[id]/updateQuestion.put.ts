export default defineEventHandler(async (event) => {
  const questionId = getRouterParam(event, "id")
  const body = await readBody(event)

  try {
    const question = await updateQuestion(
      parseInt(questionId as string),
      body.questionText as string,
      body.explanation as string,
    )

    return questionsTransformer(question)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
