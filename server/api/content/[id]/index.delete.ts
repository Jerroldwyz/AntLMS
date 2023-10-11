import { InferType, number } from "yup"
import { deleteContent } from "~/server/utils/db/content"

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

  let data
  try {
    const contentId = id
    data = await deleteContent(contentId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }

  return contentTransformer(data)
})
