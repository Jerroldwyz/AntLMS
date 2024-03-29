import { InferType, bool, object, string, array } from "yup"
import { createCourse } from "~/server/utils/db/mycourse"
import { userIdSchema } from "~/server/utils/userIdSchema"

export default defineEventHandler(async (event) => {
  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    title: string().required(),
    enabled: bool().required().default(true),
    tags: array(string().nullable().optional()),
    thumbnail: string().nullable().optional().default(null),
    creatorId: userIdSchema(),
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

  try {
    const data = await createCourse(course)
    return courseTransformer(data)
  } catch (e) {
    console.log(e)
    throw prismaErrorHandler(e)
  }
})
