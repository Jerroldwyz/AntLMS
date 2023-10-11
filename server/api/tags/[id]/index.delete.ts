import { InferType, number } from "yup"
import { deleteTag } from "~/server/utils/db/tags"

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

  // Query DB
  try {
    const tagId = id
    return await deleteTag(tagId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
