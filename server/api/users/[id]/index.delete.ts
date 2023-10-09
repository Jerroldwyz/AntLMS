import { InferType, string } from "yup"
import { deleteUser } from "~/server/utils/db/users"

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

  try {
    const userId = id
    return await deleteUser(userId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
