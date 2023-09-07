import UrlPattern from "url-pattern"
import * as yup from "yup"
import { ValidationError } from "yup"
import { stringRegex } from "../utils/validation/regex"

export default defineEventHandler(async (event) => {
  const endpoints = ["/api/account"]

  const isHandledByThisMiddleware = endpoints.some((endopoint) => {
    const pattern = new UrlPattern(endopoint)

    return pattern.match(event.node.req.url as string)
  })

  if (!isHandledByThisMiddleware) {
    return
  }

  const body = await readBody(event)

  let userAccountSchema = yup.object().shape({
    uid: yup.string().strict(),
    name: yup.string().matches(stringRegex),
    email: yup.string().email(),
    contactDetails: yup.object().shape({
      phone: yup.number().strict(),
    }),
  })

  try {
    userAccountSchema.validateSync(body, {
      abortEarly: false,
      stripUnknown: true,
    })
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
