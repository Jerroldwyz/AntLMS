import { InferType, bool, number, object, string } from "yup"
import { updateCourseById } from "~/server/utils/db/courses"

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

  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    title: string().optional(),
    enabled: bool().optional(),
    thumbnail: string().nullable().optional(),
    creator_id: string().optional().uuid(),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  const course = camelCaseToUnderscore(body)
  let data
  try {
    const courseId = id
    data = await updateCourseById(courseId, course)
  } catch (e) {
    throw prismaErrorHandler(e)
  }

  return mycourseTransformer(data)
})
