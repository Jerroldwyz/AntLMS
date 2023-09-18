export default defineEventHandler(async (event) => {
  const questionId = getRouterParam(event, "id")

  const question = await deleteQuestion(parseInt(questionId as string))

  return questionsTransformer(question)
})
