import { ValidationError, number, object, string } from "yup"
import { getCourseById } from "~/server/utils/db/courses"

export default defineEventHandler(async (event) => {
  // Route params
  const unvalidatedRouterParams = getRouterParams(event)
  const routerParamsType = object({
    id: number().required().min(1),
  })
  let courseId

  // Query params
  const unvalidatedQueryParams = getQuery(event)
  const queryParamsType = object({
    userId: string().optional().uuid(),
  })
  let userId

  // Validation
  try {
    const routerParams = await routerParamsType.validate(
      unvalidatedRouterParams,
    )
    courseId = routerParams.id
  } catch (e) {
    const error = e as unknown as ValidationError
    throw createError({
      statusCode: 400,
      statusMessage: `Bad Request router params: ${JSON.stringify(
        error.errors,
      )}`,
    })
  }
  try {
    const queryParams = await queryParamsType.validate(unvalidatedQueryParams)
    userId = queryParams.userId
  } catch (e) {
    const error = e as unknown as ValidationError
    throw createError({
      statusCode: 400,
      statusMessage: `Bad Request query params: ${JSON.stringify(
        error.errors,
      )}`,
    })
  }

  // Query DB
  let data
  try {
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
