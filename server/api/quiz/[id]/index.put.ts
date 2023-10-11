import { InferType, number, object, string } from "yup"
import { updateQuiz } from "~/server/utils/db/quiz"

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

  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    topic_id: number().optional().min(1),
    title: string().optional(),
    topic_position: number().optional().min(1),
    threshold: number().optional(),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  // Query DB
  let data
  try {
    const quizId = id
    data = await updateQuiz(quizId, camelCaseToUnderscore(body))
  } catch (e) {
    throw prismaErrorHandler(e)
  }

  return quizTransformer(data)
})
