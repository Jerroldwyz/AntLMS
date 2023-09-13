import * as yup from "yup"

import { validator } from "../utils/validation/validator"
import { isHandledByThisMiddleware } from "../utils/isHandledByThisMiddleware"

export default defineEventHandler(async (event) => {
  const endpoints = [
    "/api/courses",
    "/api/courses/enroll",
    "/api/courses/getEnrollment",
    "/api/courses/unenroll",
    "/api/courses/dummy",
  ]

  if (!isHandledByThisMiddleware(endpoints, event.node.req.url as string)) {
    return
  }

  let contentSchema = yup.object().shape({
    courseId: yup.number().strict(),
    userId: yup.string().strict(),
  })

  await validator(contentSchema, event)
})
