import { rmSync } from "fs"
import { quizPassed } from "~/server/utils/db/quiz"

export default defineEventHandler(async (event) => {
  const quizId = getRouterParam(event, "id")
  const body = await readBody(event)

  try {
    const result: any = resultTransformer(await evaluateQuiz(body.result))
    const quiz: any = await getQuizById(parseInt(quizId as string))

    if (
      parseInt(quiz.threshold as string) <=
      parseInt(result.correctAnswer as string)
    ) {
      const prismaData = {
        quiz_id: parseInt(quizId as string),
        user_id: body.userId as string,
        enrollment_id: parseInt(body.enrollmentId as string),
      }
      await quizPassed(prismaData)
    }

    result.threshold = parseInt(quiz.threshold as string)

    return result
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
