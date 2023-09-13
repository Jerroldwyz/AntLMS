import * as yup from "yup"

import { validator } from "../utils/validation/validator"
import { isHandledByThisMiddleware } from "../utils/isHandledByThisMiddleware"

export default defineEventHandler(async (event) => {
  const endpoints = [
    "/api/question",
    "/api/question/updateChoices",
    "/api/question/updateQuestion",
    "/api/question/dummy",
  ]

  if (!isHandledByThisMiddleware(endpoints, event.node.req.url as string)) {
    return
  }

  let questionSchema = yup.object().shape({
    questionId: yup.number().strict(),
    quizId: yup.number().strict(),
    questionText: yup.string().strict(),
    explanation: yup.string().strict(),
    choices: yup.array(),
  })

  await validator(questionSchema, event)
})
