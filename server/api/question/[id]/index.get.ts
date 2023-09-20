export default defineEventHandler(async (event) => {
  const questionId = getRouterParam(event, "id")

  try {
    const question = await getQuestionById(parseInt(questionId as string))
    return questionsTransformer(question)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
