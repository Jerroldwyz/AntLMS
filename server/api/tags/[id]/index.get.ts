import { InferType, number } from "yup"
import { getTagById } from "~/server/utils/db/tags"

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
    return await getTagById(tagId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
