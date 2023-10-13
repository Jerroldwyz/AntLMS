import { quiz_progress } from "@prisma/client"
import { InferType, array, number, object, string } from "yup"
import { quizPassed } from "~/server/utils/db/quiz"
import { userIdSchema } from "~/server/utils/userIdSchema"

export default defineEventHandler(async (event) => {
  // Route params
  const unvalidatedId = getRouterParam(event, "id")
  const IdSchema = number().required().integer().min(1)
  type IdType = InferType<typeof IdSchema>
  const id = await validateAndParse<IdType>({
    schema: IdSchema,
    value: unvalidatedId,
    msgOnError: "Bad request router params",
  })

  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    userId: userIdSchema(),
    enrollmentId: number().required().integer().min(1),
    result: array().required().of(number().required().integer().min(1)),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  // Query DB
  try {
    const quizId = id
    const result: any = resultTransformer(await evaluateQuiz(body.result))
    const quiz: any = await getQuizById(quizId)

    if (
      parseInt(quiz.threshold as string) <=
      parseInt(result.correctAnswer as string)
    ) {
      const prismaData = {
        quiz_id: quizId,
        user_id: body.userId,
        enrollment_id: body.enrollmentId,
      }
      await quizPassed(prismaData)
    }

    result.threshold = parseInt(quiz.threshold as string)
    return result
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
