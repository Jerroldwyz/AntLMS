export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const questionId = getRouterParam(event, "id")

  try {
    let question
    if (body.choices) {
      question = await updateChoice(
        parseInt(questionId as string),
        body.choices,
      )
    }

    if (body.question_text && body.explanation) {
      question = await updateQuestion(
        parseInt(questionId as string),
        body.questionText,
        body.explanation,
      )
    }

    return questionsTransformer(question)
  } catch (e) {
    console.log(e)

    return sendError(event, prismaErrorHandler(e))
  }
})
