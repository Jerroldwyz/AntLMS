import UrlPattern from "url-pattern"
import * as yup from "yup"
import { ValidationError } from "yup"
import { stringRegex } from "../utils/validation/regex"
import { content_type } from "@prisma/client"

export default defineEventHandler(async (event) => {
  const endpoints = ["/api/content"]

  const isHandledByThisMiddleware = endpoints.some((endopoint) => {
    const pattern = new UrlPattern(endopoint)

    return pattern.match(event.node.req.url as string)
  })

  if (!isHandledByThisMiddleware) {
    return
  }

  const body = await readBody(event)

  let contentSchema = yup.object().shape({
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

  try {
    contentSchema.validateSync(body, { abortEarly: false, stripUnknown: true })
  } catch (e) {
    const error = e as ValidationError

    return sendError(
      event,
      createError({
        statusCode: 422,
        statusMessage: JSON.stringify(error.errors),
      })
    )
  }
})
