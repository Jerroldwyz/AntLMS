import UrlPattern from "url-pattern"
import * as yup from "yup"
import { content_type } from "@prisma/client"
import { validator } from "../utils/validation/validator"
import { isHandledByThisMiddleware } from "../utils/isHandledByThisMiddleware"

export default defineEventHandler(async (event) => {
  const endpoints = ["/api/topic"]

  if (!isHandledByThisMiddleware(endpoints, event.node.req.url as string)) {
    return
  }

  let topicSchema = yup.object().shape({
    topicId: yup.number().strict(),
    title: yup.string().strict(),
    courseId: yup.string().strict(),
  })

  validator(topicSchema, event)
})
