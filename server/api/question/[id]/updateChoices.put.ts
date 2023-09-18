export default defineEventHandler(async (event) => {
  const questionId = getRouterParam(event, "id")
  const body = await readBody(event)

  const question = await updateChoice(
    parseInt(questionId as string),
    body.choices,
  )

  return questionsTransformer(question)
})
