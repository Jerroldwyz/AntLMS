import { InferType, number } from "yup"
import { deleteTopic } from "~/server/utils/db/topic"

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

  let data
  try {
    const topicId = id
    data = await deleteTopic(topicId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }

  return topicsTransformer(data)
})
