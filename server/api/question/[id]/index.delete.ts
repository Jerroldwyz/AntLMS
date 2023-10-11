import { InferType, number } from "yup"
import { deleteQuestion } from "~/server/utils/db/question"

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
    const questionId = id
    data = await deleteQuestion(questionId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
  return questionsTransformer(data)
})
