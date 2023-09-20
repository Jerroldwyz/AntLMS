import * as yup from "yup"

import UrlPattern from "url-pattern"
import { validator } from "../utils/validation/validator"
import { isHandledByThisMiddleware } from "../utils/isHandledByThisMiddleware"

export default defineEventHandler(async (event) => {
  const endpoints = ["/api/topic", "/api/topic/dummy"]

  if (
    !isHandledByThisMiddleware(endpoints, event.node.req.url as string) ||
    new UrlPattern(/\/api\/topic\/[0-9a-zA-Z]+$/).match(
      event.node.req.url as string,
    )
  ) {
    return
  }

  const topicSchema = yup.object().shape({
    topicId: yup.number().strict(),
    title: yup.string().strict(),
    courseId: yup.string().strict(),
  })

  await validator(topicSchema, event)
})
