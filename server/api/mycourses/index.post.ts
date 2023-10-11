import { InferType, bool, object, string } from "yup"
import { createCourse } from "~/server/utils/db/mycourse"

export default defineEventHandler(async (event) => {
  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    title: string().required(),
    enabled: bool().required().default(true),
    thumbnail: string().nullable().optional().default(null),
    creatorId: string().required().uuid(),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  // Query DB
  const course = camelCaseToUnderscore(body)

  console.log(course)
  let data
  try {
    data = await createCourse(course)
  } catch (e) {
    throw prismaErrorHandler(e)
  }

  return courseTransformer(data)
})
