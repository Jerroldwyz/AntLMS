import { object, string, InferType, bool } from "yup"
import { getCourseByTagId, getCourseByName } from "~/server/utils/db/courses"

export default defineEventHandler(async (event) => {
  // Query params
  const unvalidatedQueryParams = getQuery(event)
  const queryParamsSchema = object({
    status: bool().optional().default(undefined),
    searchQuery: string().optional(),
  })
  type queryParamsType = InferType<typeof queryParamsSchema>
  const queryParams = await validateAndParse<queryParamsType>({
    schema: queryParamsSchema,
    value: unvalidatedQueryParams,
    msgOnError: "Bad query params",
  })

  try {
    const enabled = queryParams.status
    if (queryParams.searchQuery) {
      const searchQuery = queryParams.searchQuery
      const tag_ids = await getTags(searchQuery)
      const courseById = await getCourseByTagId(tag_ids as number[], enabled)
      const courseByName = await getCourseByName(searchQuery, enabled)
      return [...courseById, ...courseByName]
    }
    // all, enabled, disabled
    return await getAllCourses(enabled)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
