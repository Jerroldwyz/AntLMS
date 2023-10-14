import { InferType, number, object, string } from "yup"
import { getCourseById } from "~/server/utils/db/courses"

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

  // Query params
  const unvalidatedQueryParams = getQuery(event)
  const queryParamsSchema = object({
    userId: string().optional().uuid(),
  })
  type queryParamsType = InferType<typeof queryParamsSchema>
  const queryParams = await validateAndParse<queryParamsType>({
    schema: queryParamsSchema,
    value: unvalidatedQueryParams,
    msgOnError: "Bad query params",
  })
  const userId = queryParams.userId

  // Query DB
  let data
  try {
    const courseId = id
    data = await getCourseById(courseId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
  if (data === null) {
    throw createError({
      statusCode: 404,
      statusMessage: "Content ID does not exist",
    })
  }

  return courseTransformer(data, userId)
})
