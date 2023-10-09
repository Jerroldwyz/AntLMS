import { InferType, number, object } from "yup"
import { getTopics } from "~/server/utils/db/topic"

export default defineEventHandler(async (event) => {
  // Query params
  const unvalidatedQueryParams = getQuery(event)
  const queryParamsSchema = object({
    courseId: number().required().min(1).integer(),
  })
  type queryParamsType = InferType<typeof queryParamsSchema>
  const queryParams = await validateAndParse<queryParamsType>({
    schema: queryParamsSchema,
    value: unvalidatedQueryParams,
    msgOnError: "Bad query params",
  })

  try {
    const courseId = queryParams.courseId
    const topic = await getTopics(courseId)
    return topicsTransformer(topic)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
