import { InferType, number } from "yup"
import { getCreatorCourseById } from "~/server/utils/db/mycourse"

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

  // Query DB
  let data
  try {
    const courseId = id
    data = await getCreatorCourseById(courseId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
  if (data === null) {
    throw createError({
      statusCode: 404,
      statusMessage: "Content ID does not exist",
    })
  }

  return mycourseTransformer(data)
})
