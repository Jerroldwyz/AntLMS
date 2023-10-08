import * as yup from "yup"
import { content_type } from "@prisma/client"
import UrlPattern from "url-pattern"
import { validator } from "../utils/validation/validator"
import { isHandledByThisMiddleware } from "../utils/isHandledByThisMiddleware"

export default defineEventHandler(async (event) => {
  const endpoints = /\/api\/quiz(\/?.)*/

  const url = event.node.req.url as string

  const isHandledByThisMiddleware = new UrlPattern(endpoints).match(url)

  if (!isHandledByThisMiddleware) {
    return
  }

  const quizSchema = yup.object().shape({
    userId: yup.string().strict(),
    result: yup.array(),
    quizScoreId: yup.number().strict(),
    enrollmentId: yup.number().strict(),
    topicId: yup.number().strict(),
    title: yup.string().strict(),
    topicPosition: yup.number().strict(),
  })

  await validator(quizSchema, event)
})
