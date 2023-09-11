export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const question = await updateChoice(
    parseInt(body.questionId as string),
    body.choices
  )

  return questionsTransformer(question)
})
