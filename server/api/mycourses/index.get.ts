import { object, string, InferType } from "yup"

export default defineEventHandler(async (event) => {
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

  try {
    return getCreatorCourses(userId as string)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
