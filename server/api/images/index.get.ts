import { InferType, object, string } from "yup"
import { generatePresignedUrl } from "~/server/utils/backend-s3-helpers"

export default defineEventHandler(async (event) => {
  // Query params
  const unvalidatedQueryParams = getQuery(event)
  const queryParamsSchema = object({
    path: string().required(),
  })
  type queryParamsType = InferType<typeof queryParamsSchema>
  const queryParams = await validateAndParse<queryParamsType>({
    schema: queryParamsSchema,
    value: unvalidatedQueryParams,
    msgOnError: "Bad query params",
  })

  const path = queryParams.path
  const presignedUrl = await generatePresignedUrl(path)
  return { success: true, presignedUrl }
})
