import * as yup from "yup"

import UrlPattern from "url-pattern"
import { validator } from "../utils/validation/validator"
import { isHandledByThisMiddleware } from "../utils/isHandledByThisMiddleware"

export default defineEventHandler(async (event) => {
  const endpoints = /\/api\/courses(\/?.)*/
  const url = event.node.req.url as string

  const isHandledByThisMiddleware = new UrlPattern(endpoints).match(url)

  if (!isHandledByThisMiddleware) {
    return
  }

  const contentSchema = yup.object().shape({
    userId: yup.string().strict(),
  })
  await validator(contentSchema, event)
})
