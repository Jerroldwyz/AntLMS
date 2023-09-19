export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const question = await deleteQuestion(parseInt(body.questionId as string))

    return questionsTransformer(question)
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
