export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const question = await updateQuestion(
    parseInt(body.questionId as string),
    body.questionText as string,
    body.explanation as string,
  )

  return questionsTransformer(question)
})
