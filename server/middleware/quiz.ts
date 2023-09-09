import * as yup from "yup"
import { content_type } from "@prisma/client"
import { validator } from "../utils/validation/validator"
import { isHandledByThisMiddleware } from "../utils/isHandledByThisMiddleware"

export default defineEventHandler(async (event) => {
  const endpoints = [
    "/api/quiz",
    "/api/quiz/evaluate",
    "/api/quiz/getResult",
    "/api/quiz/updateQuizPosition",
    "/api/quiz/updateQuizTitle",
  ]

  if (!isHandledByThisMiddleware(endpoints, event.node.req.url as string)) {
    return
  }

  let quizSchema = yup.object().shape({
    quizId: yup.number().strict(),
    userId: yup.string().strict(),
    result: yup.array(),
    quizScoreId: yup.number().strict(),
    enrollmentId: yup.number().strict(),
    topicId: yup.number().strict(),
    title: yup.string().strict(),
    topicPosition: yup.number().strict(),
  })

  validator(quizSchema, event)
})
