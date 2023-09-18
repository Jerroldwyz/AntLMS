export default defineEventHandler(async (event) => {
  const questionId = getRouterParam(event, "id")

  const question = await getQuestionById(parseInt(questionId as string))
  return questionsTransformer(question)
})
