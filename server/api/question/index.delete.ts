export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const question = await deleteQuestion(parseInt(body.questionId as string))

  return questionsTransformer(question)
})
