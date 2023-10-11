import { object, string, InferType } from "yup"

export default defineEventHandler(async (event) => {
  // Query params
  const unvalidatedQueryParams = getQuery(event)
  const queryParamsSchema = object({
    status: string()
      .optional()
      .matches(/(all|enabled|disabled)/, { excludeEmptyString: true }),
  })
  type queryParamsType = InferType<typeof queryParamsSchema>
  const queryParams = await validateAndParse<queryParamsType>({
    schema: queryParamsSchema,
    value: unvalidatedQueryParams,
    msgOnError: "Bad query params",
  })
  const status = queryParams.status ?? "all"

  try {
    // all, enabled, disabled
    return await getAllCourses(status)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
