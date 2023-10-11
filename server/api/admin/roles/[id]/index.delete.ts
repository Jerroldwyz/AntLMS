import { InferType, number } from "yup"
import { deleteRoleById } from "~/server/utils/db/admin"

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

  try {
    const roleId = id
    return await deleteRoleById(roleId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
