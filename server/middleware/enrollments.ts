import * as yup from "yup"
import UrlPattern from "url-pattern"

export default defineEventHandler(async (event) => {
  const endpoints = /\/api\/users\/([^/]+)\/enrollments(\/?.)*/
  const url = event.node.req.url as string

  const isHandledByThisMiddleware = new UrlPattern(endpoints).match(url)

  if (!isHandledByThisMiddleware) {
    return
  }

  const enrollmentSchema = yup.object().shape({
    userId: yup.string().strict(),
    courseId: yup.object().strict(),
  })

  await validator(enrollmentSchema, event)
})
