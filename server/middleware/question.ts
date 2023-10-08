import * as yup from "yup"

import UrlPattern from "url-pattern"
import { validator } from "../utils/validation/validator"
import { isHandledByThisMiddleware } from "../utils/isHandledByThisMiddleware"

export default defineEventHandler(async (event) => {
  const endpoints = /\/api\/question(\/?.)*/

  const url = event.node.req.url as string

  const isHandledByThisMiddleware = new UrlPattern(endpoints).match(url)

  if (!isHandledByThisMiddleware) {
    return
  }

  const questionSchema = yup.object().shape({
    quizId: yup.number().strict(),
    questionText: yup.string().strict(),
    explanation: yup.string().strict(),
    choices: yup.array(),
  })

  await validator(questionSchema, event)
})
