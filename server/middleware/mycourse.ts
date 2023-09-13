import * as yup from "yup"

import { validator } from "../utils/validation/validator"
import { isHandledByThisMiddleware } from "../utils/isHandledByThisMiddleware"

export default defineEventHandler(async (event) => {
  const endpoints = [
    "/api/mycourses",
    "/api/mycourses/updateThumbnail",
    "/api/mycourses/updateTitle",
    "/api/mycourses/changeEnabled",
    "/api/mycourses/all",
    "/api/mycourses/quiz",
    "/api/mycourses/dummy",
  ]

  if (!isHandledByThisMiddleware(endpoints, event.node.req.url as string)) {
    return
  }

  const myCourseSchema = yup.object().shape({
    quizId: yup.number().strict(),
    userId: yup.string().strict(),
    courseId: yup.number().strict(),
    enabled: yup.boolean(),
    title: yup.string().strict(),
    creator_id: yup.number().strict(),
    thumbnail: yup.string().strict(),
    tags: yup.array(),
  })

  await validator(myCourseSchema, event)
})
