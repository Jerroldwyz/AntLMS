import { content_type } from "@prisma/client"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const prismaData = camelCaseToUnderscore(body)

  try {
    const content = await createContent(prismaData)
    return contentTransformer(content)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
