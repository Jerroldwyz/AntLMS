import { getQuizById } from "~~/server/db/quiz"
import { quizTransformer } from "~~/server/transformers/quiz"

export default defineEventHandler(async (event) => {
  const query = await getQuery(event)

  const quiz = await getQuizById(parseInt(query.quizId as string))

  return quizTransformer(quiz)
})
