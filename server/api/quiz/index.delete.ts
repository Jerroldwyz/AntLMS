import { deleteQuiz } from "~~/server/db/quiz"
import { quizTransformer } from "~~/server/transformers/quiz"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const quiz = await deleteQuiz(parseInt(body.quizId as string))

  return quizTransformer(quiz)
})
