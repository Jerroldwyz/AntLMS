import { prisma } from "."

export const getQuestionById = (question_id: number) => {
  return prisma.questions.findUnique({
    where: {
      id: question_id,
    },
    select: {
      id: true,
      quiz_id: true,
      question_text: true,
      explanation: true,
      choices: {
        select: {
          choice_text: true,
          is_correct: true,
          id: true,
        },
      },
    },
  })
}

export const createQuestion = async (question_data: any) => {
  const newQuestion = await prisma.questions.create({
    data: question_data,
  })
  return await getQuestionById(newQuestion.id)
}

export const updateQuestion = async (
  question_id: number,
  question_text: string,
  explanation: string,
) => {
  const updatedQuestion = await prisma.questions.update({
    where: {
      id: question_id,
    },
    data: {
      question_text,
      explanation,
    },
  })
  return await getQuestionById(updatedQuestion.id)
}

export const updateChoice = async (question_id: number, choice_data: any) => {
  await prisma.choices.deleteMany({
    where: {
      question_id,
    },
  })

  const updatedQuestion = await prisma.questions.update({
    where: {
      id: question_id,
    },
    data: {
      choices: {
        createMany: {
          data: choice_data.map((choice: any) => {
            const modifiedChoice: any = {
              choice_text: choice.choiceText,
              is_correct: choice.isCorrect,
            }
            return modifiedChoice
          }),
        },
      },
    },
  })
  return await getQuestionById(updatedQuestion.id)
}

export const deleteQuestion = async (question_id: number) => {
  const prefetchedQuestion = await getQuestionById(question_id)
  await prisma.questions.delete({
    where: {
      id: question_id,
    },
  })
  return prefetchedQuestion
}
