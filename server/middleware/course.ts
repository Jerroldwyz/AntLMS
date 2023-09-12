import UrlPattern from "url-pattern"

export default defineEventHandler(async (event) => {
  const endpoints = /\/api\/course\/.+/

  const url = event.node.req.url as string

  const isHandledByThisMiddleware = new UrlPattern(endpoints).match(url)

  if (!isHandledByThisMiddleware) {
    return
  }

  const id = getLastNumber(url)

  if (!Number(id)) {
    return sendError(
      event,
      createError({
        statusCode: 422,
        statusMessage: "Not a valid course id",
      })
    )
  }
})

const getLastNumber = (url: string) => {
  const pattern = /(\d+)$/
  const match = pattern.exec(url)
  return match ? match[1] : null
}
