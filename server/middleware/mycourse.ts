import * as yup from "yup"

import UrlPattern from "url-pattern"
import { validator } from "../utils/validation/validator"
import { isHandledByThisMiddleware } from "../utils/isHandledByThisMiddleware"

export default defineEventHandler(async (event) => {
  const endpoints = /\/api\/mycourse(\/?.)*/

  const url = event.node.req.url as string

  const isHandledByThisMiddleware = new UrlPattern(endpoints).match(url)

  if (!isHandledByThisMiddleware) {
    return
  }

  const myCourseSchema = yup.object().shape({
    quizId: yup.number().strict(),
    userId: yup.string().strict(),
    courseId: yup.number().strict(),
    enabled: yup.boolean().strict(),
    title: yup.string().strict(),
    creator_id: yup.number().strict(),
    thumbnail: yup.string().strict(),
    tags: yup.array(),
  })

  await validator(myCourseSchema, event)
})
