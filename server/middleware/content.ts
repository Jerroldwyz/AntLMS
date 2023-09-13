import * as yup from "yup"
import { content_type } from "@prisma/client"
import { validator } from "../utils/validation/validator"
import { isHandledByThisMiddleware } from "../utils/isHandledByThisMiddleware"

export default defineEventHandler(async (event) => {
  const endpoints = [
    "/api/content",
    "/api/content/updateContent",
    "/api/content/updateContentPosition",
    "/api/content/updateTitle",
    "/api/content/complete",
    "/api/content/dummy",
  ]

  if (!isHandledByThisMiddleware(endpoints, event.node.req.url as string)) {
    return
  }

  const contentSchema = yup.object().shape({
    title: yup.string().strict(),
    type: yup.mixed<content_type>().oneOf(Object.values(content_type)),
    content: yup.string(),
    topicId: yup.number().strict(),
    topicPosition: yup.number().strict(),
    contentId: yup.number().strict(),
    contentPosition: yup.number().strict(),
    enrollmentId: yup.number().strict(),
    userId: yup.string().strict(),
  })

  await validator(contentSchema, event)
})
