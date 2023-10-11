import { InferType, number, object, string } from "yup"
import { createQuiz } from "~/server/utils/db/quiz"

export default defineEventHandler(async (event) => {
  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    topic_id: number().required().integer().min(1),
    title: string().required(),
    topic_position: number().required().integer().min(1),
    threshold: number().required().integer().positive(),
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
    data = await createQuiz(camelCaseToUnderscore(body))
  } catch (e) {
    throw prismaErrorHandler(e)
  }
  return quizTransformer(data)
})
