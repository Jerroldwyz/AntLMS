import { InferType, object, string } from "yup"
import { createTag } from "~/server/utils/db/tags"

export default defineEventHandler(async (event) => {
  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    name: string().required(),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  const prismaQuery = camelCaseToUnderscore(body)

  let data
  try {
    data = await createTag(prismaQuery)
  } catch (e) {
    throw prismaErrorHandler(e)
  }

  return data
})
