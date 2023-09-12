import UrlPattern from "url-pattern"

export const isHandledByThisMiddleware = (endpoints: string[], url: string) => {
  return endpoints.some((endopoint) => {
    const pattern = new UrlPattern(endopoint)
    return pattern.match(url as string)
  })
}
