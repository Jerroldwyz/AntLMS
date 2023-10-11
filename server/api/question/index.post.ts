import { string, array, object, InferType, bool, number } from "yup"
import { createQuestion } from "~/server/utils/db/question"

export default defineEventHandler(async (event) => {
  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    quizId: number().required().integer().min(1),
    choices: array()
      .required()
      .of(
        object({
          choiceText: string().required(),
          isCorrect: bool().required(),
        }),
      ),
    questionText: string().required(),
    explanation: string().required(),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  const prismaData = {
    quiz_id: body.quizId,
    question_text: body.questionText,
    explanation: body.explanation,
    choices: {
      createMany: {
        data: body.choices.map((choice: any) => {
          const modifiedChoice: any = {
            choice_text: choice.choiceText,
            is_correct: choice.isCorrect,
          }
          return modifiedChoice
        }),
      },
    },
  }

  let data
  try {
    data = await createQuestion(prismaData)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
  return questionsTransformer(data)
})
