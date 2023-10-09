import { InferType, number, object, string } from "yup"
import { createTopic } from "~/server/utils/db/topic"

export default defineEventHandler(async (event) => {
  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    courseId: number().required().integer().min(1),
    title: string().required(),
    position: number().required().integer().min(1),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  const prismaQuery = camelCaseToUnderscore(body)
  try {
    const topic = await createTopic(prismaQuery)
    return topicsTransformer(topic)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
