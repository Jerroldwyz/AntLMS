import { InferType, number } from "yup"
import { getContentById } from "~/server/utils/db/content"

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

  // Query DB
  let data
  try {
    const contentId = id
    data = await getContentById(contentId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }

  if (data === null) {
    throw createError({
      statusCode: 404,
      statusMessage: "Role ID does not exist",
    })
  }
  return data
})
