import { InferType, bool, number, object, string, array } from "yup"
import { updateCourseById } from "~/server/utils/db/mycourse"
import { optionalIdSchema, userIdSchema } from "~/server/utils/userIdSchema"

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
    tags: array(string().nullable().optional()),
    thumbnail: string().nullable().optional(),
    creator_id: optionalIdSchema(),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  const course = camelCaseToUnderscore(body)
  try {
    console.log("c: " + JSON.stringify(course))
    const data = await updateCourseById(id, course)
    return mycourseTransformer(data)
  } catch (e) {
    console.log(e)
    throw prismaErrorHandler(e)
  }
})
