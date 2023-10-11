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

  let data
  try {
    const quizId = id
    data = await deleteQuiz(quizId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
  return quizTransformer(data)
})
