import { InferType, string } from "yup"
import { getEnrollment } from "~/server/utils/db/enrollment"
import { userIdSchema } from "~/server/utils/userIdSchema"

export default defineEventHandler(async (event) => {
  // Route params
  const unvalidatedId = getRouterParam(event, "id")
  const IdSchema = userIdSchema()
  type IdType = InferType<typeof IdSchema>
  const id = await validateAndParse<IdType>({
    schema: IdSchema,
    value: unvalidatedId,
    msgOnError: "Bad request router params",
  })

  try {
    const userUid = id
    return await getEnrollment(userUid)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
