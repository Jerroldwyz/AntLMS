import { InferType, bool, object, string } from "yup"
import { createCourse } from "~/server/utils/db/mycourse"

export default defineEventHandler(async (event) => {
  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    title: string().required(),
    enabled: bool().required(),
    thumbnail: string().nullable().required(),
    creator_id: string().required().uuid(),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  // Query DB
  const course = camelCaseToUnderscore(body)
  try {
    const mycourse = await createCourse(course)
    return courseTransformer(mycourse)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
