import { camelCaseToUnderscore } from "~/server/utils/camelCaseToUnderscore"

export default defineEventHandler(async (event) => {
  const contentId = getRouterParam(event, "id")
  const body = await readBody(event)
  const prismaData = camelCaseToUnderscore(body)

  try {
    return await updateContent(parseInt(contentId as string), prismaData)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
