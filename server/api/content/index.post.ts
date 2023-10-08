import { string, object, number, InferType } from "yup"

export default defineEventHandler(async (event) => {
  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    title: string().required(),
    type: string()
      .required()
      .matches(/(TEXT|VIDEO)/, { excludeEmptyString: true }),
    content: string().nullable(),
    topicId: number().required().integer().min(1),
    topicPosition: number().required().integer().min(1),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  const prismaData = camelCaseToUnderscore(body)
  try {
    const content = await createContent(prismaData)
    return contentTransformer(content)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
