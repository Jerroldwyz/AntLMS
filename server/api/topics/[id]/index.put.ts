import { InferType, number, object, string } from "yup"
import { updateTopicTitle } from "~/server/utils/db/topic"

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
    title: string().required(),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  try {
    const topicId = id
    const title = body.title
    const topic = await updateTopicTitle(topicId, title)
    return topicsTransformer(topic)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
