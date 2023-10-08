import { number, object, string, InferType } from "yup"
import { camelCaseToUnderscore } from "~/server/utils/camelCaseToUnderscore"
import { updateContent } from "~/server/utils/db/content"

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

  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    title: string().optional(),
    type: string()
      .optional()
      .matches(/(TEXT|VIDEO)/, { excludeEmptyString: true }),
    content: string().nullable().optional(),
    topicId: number().optional().min(1),
    topicPosition: number().optional().min(1),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  try {
    const contentId = id
    return await updateContent(contentId, camelCaseToUnderscore(body))
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
