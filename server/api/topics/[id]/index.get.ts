import { InferType, number } from "yup"
import { getTopicById } from "~/server/utils/db/topic"

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

  try {
    const topicId = id
    const topic = await getTopicById(topicId)
    return topicsTransformer(topic)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
