import { InferType, number, object, string } from "yup"
import { enrollUser } from "~/server/utils/db/enrollment"

export default defineEventHandler(async (event) => {
  // Route params
  const unvalidatedId = getRouterParam(event, "id")
  const IdSchema = string().required().uuid()
  type IdType = InferType<typeof IdSchema>
  const id = await validateAndParse<IdType>({
    schema: IdSchema,
    value: unvalidatedId,
    msgOnError: "Bad request router params",
  })

  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    courseId: number().required().integer().min(1),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  try {
    const userUid = id
    const courseId = body.courseId
    return await enrollUser(userUid, courseId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
