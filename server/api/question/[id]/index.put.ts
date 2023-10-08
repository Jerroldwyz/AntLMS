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
          choice_text: string().required(),
          is_correct: bool().required(),
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

  const questionId = id
  try {
    // TODO, make this better, maybe one function?
    let question
    if (body.choices) {
      question = await updateChoice(questionId, body.choices)
    }

    if (body.questionText && body.explanation) {
      question = await updateQuestion(
        questionId,
        body.questionText,
        body.explanation,
      )
    }

    return questionsTransformer(question)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
