import { InferType, string } from "yup"
import { getManagerRoleMapping } from "~/server/utils/db/admin"
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
    const managerId = id
    return await getManagerRoleMapping(managerId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
