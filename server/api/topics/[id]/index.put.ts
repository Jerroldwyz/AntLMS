import { InferType, number, object, string } from "yup"
import { updateTopic } from "~/server/utils/db/topic"

export default defineEventHandler(async (event) => {
  // Route params
  const unvalidatedId = getRouterParam(event, "id")
  const IdSchema = number().required().integer().min(1)
  type IdType = InferType<typeof IdSchema>
  const id = await validateAndParse<IdType>({
    schema: IdSchema,
    value: unvalidatedId,
    msgOnError: "Bad request router params",
  })

  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    title: string().optional(),
    position: number().optional().integer().min(1),
    courseId: number().optional().integer().min(1),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  let data
  try {
    const topicId = id
    const title = body.title
    data = await updateTopic(topicId, camelCaseToUnderscore(body))
  } catch (e) {
    throw prismaErrorHandler(e)
  }

  return topicsTransformer(data)
})
