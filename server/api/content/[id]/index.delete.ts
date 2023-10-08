import { InferType, number } from "yup"

export default defineEventHandler(async (event) => {
  // Route params
  const unvalidatedId = getRouterParam(event, "id")
  const IdSchema = number().required().min(1)
  type IdType = InferType<typeof IdSchema>
  const id = await validateAndParse<IdType>({
    schema: IdSchema,
    value: unvalidatedId,
    msgOnError: "Bad request router params",
  })

  try {
    const contentId = id
    const content = await deleteContent(contentId)
    return contentTransformer(content)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
