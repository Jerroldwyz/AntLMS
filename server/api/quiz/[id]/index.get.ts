import { InferType, number } from "yup"

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
    const quizId = id
    const quiz = await getQuizById(quizId)
    return quizTransformer(quiz)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
