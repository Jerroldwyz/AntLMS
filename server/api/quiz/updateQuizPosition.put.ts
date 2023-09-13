export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const quiz = await updateQuizPosition(
    parseInt(body.quizId as string),
    parseInt(body.topicPosition as string),
  )

  return quizTransformer(quiz)
})
