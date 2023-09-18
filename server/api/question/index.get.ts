export default defineEventHandler(async (event) => {
  const query = await getQuery(event)

  const question = await getQuestionById(parseInt(query.questionId as string))

  return questionsTransformer(question)
})
