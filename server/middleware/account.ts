import * as yup from "yup"
import UrlPattern from "url-pattern"
import { stringRegex } from "../utils/validation/regex"
import { validator } from "../utils/validation/validator"

export default defineEventHandler(async (event) => {
  const endpoints = /\/api\/users(\/?.)*/
  const enrollmentsEndpoint = /\/api\/users\/([^/]+)\/enrollments(\/?.)*/
  const progressEndpoint = /\/api\/users\/([^/]+)\/progress(\/?.)*/
  const url = event.node.req.url as string

  const isHandledByThisMiddleware = new UrlPattern(endpoints).match(url)

  const isHandledByEnrollmentsMiddleware = new UrlPattern(
    enrollmentsEndpoint,
  ).match(url)

  const isHandledByProgressMiddleware = new UrlPattern(progressEndpoint).match(
    url,
  )
  if (!isHandledByThisMiddleware) {
    return
  }

  if (isHandledByEnrollmentsMiddleware || isHandledByProgressMiddleware) {
    return
  }

  const userAccountSchema = yup.object().shape({
    uid: yup.string().strict(),
    name: yup.string().matches(stringRegex),
    email: yup.string().email(),
    contactDetails: yup.object().shape({
      phone: yup.number().strict(),
    }),
  })
  await validator(userAccountSchema, event)
})
