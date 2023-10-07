export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const quiz = await updateQuizTitle(
      parseInt(body.quizId as string),
      body.title as string,
    )

    return quizTransformer(quiz)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
