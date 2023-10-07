export default defineEventHandler(async (event) => {
  const questionId = getRouterParam(event, "id")

  try {
    const question = await deleteQuestion(parseInt(questionId as string))
    return questionsTransformer(question)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
