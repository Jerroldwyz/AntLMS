export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const question = await updateChoice(
      parseInt(body.questionId as string),
      body.choices,
    )

    return questionsTransformer(question)
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
