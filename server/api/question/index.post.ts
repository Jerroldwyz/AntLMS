export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const prismaData = {
    quiz_id: parseInt(body.quizId as string),
    question_text: body.questionText as string,
    explanation: body.explanation as string,
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
  try {
    const question = await createQuestion(prismaData)

    return questionsTransformer(question)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
