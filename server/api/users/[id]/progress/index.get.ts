import { InferType, number, object, string } from "yup"
import { getEnrollmentProgress } from "~/server/utils/db/enrollment"

export default defineEventHandler(async (event) => {
  // Route params
  const unvalidatedId = getRouterParam(event, "id")
  const IdSchema = string().required().uuid()
  type IdType = InferType<typeof IdSchema>
  const id = await validateAndParse<IdType>({
    schema: IdSchema,
    value: unvalidatedId,
    msgOnError: "Bad request router params",
  })

  // Query params
  const unvalidatedQueryParams = getQuery(event)
  const queryParamsSchema = object({
    courseId: number().required().integer().min(1),
  })
  type queryParamsType = InferType<typeof queryParamsSchema>
  const queryParams = await validateAndParse<queryParamsType>({
    schema: queryParamsSchema,
    value: unvalidatedQueryParams,
    msgOnError: "Bad query params",
  })

  try {
    const userId = id
    const courseId = queryParams.courseId
    return await getEnrollmentProgress(userId, courseId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
