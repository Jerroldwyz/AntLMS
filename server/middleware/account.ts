import * as yup from "yup"
import { stringRegex } from "../utils/validation/regex"
import { isHandledByThisMiddleware } from "../utils/isHandledByThisMiddleware"
import { validator } from "../utils/validation/validator"

export default defineEventHandler(async (event) => {
  const endpoints = ["/api/account", "/api/account/dummy"]

  if (!isHandledByThisMiddleware(endpoints, event.node.req.url as string)) {
    return
  }

  let userAccountSchema = yup.object().shape({
    uid: yup.string().strict(),
    name: yup.string().matches(stringRegex),
    email: yup.string().email(),
    contactDetails: yup.object().shape({
      phone: yup.number().strict(),
    }),
  })

  await validator(userAccountSchema, event)
})
