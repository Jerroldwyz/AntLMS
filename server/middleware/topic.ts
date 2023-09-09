import * as yup from "yup"

import { validator } from "../utils/validation/validator"
import { isHandledByThisMiddleware } from "../utils/isHandledByThisMiddleware"
import UrlPattern from "url-pattern"

export default defineEventHandler(async (event) => {
  const endpoints = ["/api/topic"]

  if (
    !isHandledByThisMiddleware(endpoints, event.node.req.url as string) ||
    new UrlPattern(/\/api\/topic\/[0-9a-zA-Z]+$/).match(
      event.node.req.url as string
    )
  ) {
    return
  }

  let topicSchema = yup.object().shape({
    topicId: yup.number().strict(),
    title: yup.string().strict(),
    courseId: yup.string().strict(),
  })

  validator(topicSchema, event)
})
