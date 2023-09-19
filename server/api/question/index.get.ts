export default defineEventHandler(async (event) => {
  const query = await getQuery(event)

  try {
    const question = await getQuestionById(parseInt(query.questionId as string))

    return questionsTransformer(question)
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
