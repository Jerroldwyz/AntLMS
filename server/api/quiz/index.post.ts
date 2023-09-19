export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const prismaData = {
    topic_id: parseInt(body.topicId as string),
    title: body.title as string,
    topic_position: parseInt(body.topicPosition as string),
  }

  try {
    const quiz = await createQuiz(prismaData)

    return quizTransformer(quiz)
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
