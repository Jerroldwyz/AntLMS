import {
  evaluateQuiz,
  storeQuizResult,
  storeExistingQuizResult,
} from "~~/server/db/quiz"
import { resultTransformer } from "~~/server/transformers/quizResult"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const result = resultTransformer(await evaluateQuiz(body.result))

  if (body.quizScoreId !== undefined) {
    await storeExistingQuizResult(result, body.quizScoreId)
  } else {
    await storeQuizResult(
      result,
      parseInt(body.enrollmentId),
      body.userId as string,
      parseInt(body.quizId)
    )
  }

  return result
})
