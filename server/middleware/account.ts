import * as yup from "yup"
import UrlPattern from "url-pattern"
import { stringRegex } from "../utils/validation/regex"
import { isHandledByThisMiddleware } from "../utils/isHandledByThisMiddleware"
import { validator } from "../utils/validation/validator"

export default defineEventHandler(async (event) => {
  const endpoints = /\/api\/users(\/?.)*/
  const url = event.node.req.url as string

  const isHandledByThisMiddleware = new UrlPattern(endpoints).match(url)

  if (!isHandledByThisMiddleware) {
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
