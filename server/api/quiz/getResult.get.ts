import { getQuizResult } from "~~/server/db/quiz"
import { quizTransformer } from "~~/server/transformers/quiz"

export default defineEventHandler(async (event) => {
  const query = await getQuery(event)

  return await getQuizResult(
    query.userId as string,
    parseInt(query.quizId as string)
  )
})
