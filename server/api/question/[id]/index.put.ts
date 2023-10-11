import { InferType, number, object, bool, string, array } from "yup"

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
    choices: array()
      .optional()
      .of(
        object({
          choiceText: string().required(),
          isCorrect: bool().required(),
        }),
      ),
    questionText: string().optional(),
    explanation: string().optional(),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  let data
  try {
    const questionId = id
    // TODO, make this better, maybe one function?
    if (body.choices) {
      data = await updateChoice(questionId, body.choices)
    }
    if (body.questionText && body.explanation) {
      data = await updateQuestion(
        questionId,
        body.questionText,
        body.explanation,
      )
    }
  } catch (e) {
    throw prismaErrorHandler(e)
  }

  return questionsTransformer(data)
})
