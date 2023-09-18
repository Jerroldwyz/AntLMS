export default defineEventHandler(async (event) => {
  const quizId = getRouterParam(event, "id")
  const query = await getQuery(event)

  return await getQuizResult(query.userId as string, parseInt(quizId as string))
})
