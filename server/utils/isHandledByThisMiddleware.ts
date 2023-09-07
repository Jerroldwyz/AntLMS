import UrlPattern from "url-pattern"
import { H3Event } from "h3"

export const isHandledByThisMiddleware = (endpoints: string[], url: string) => {
  return endpoints.some((endopoint) => {
    const pattern = new UrlPattern(endopoint)

    return pattern.match(url as string)
  })
}
