import { prisma } from "."

export const getQuestionById = (question_id: number) => {
  return prisma.questions.findUnique({
    where: {
      id: question_id,
    },
    select: {
      question_text: true,
      explanation: true,
      choices: {
        select: {
          choice_text: true,
          id: true,
        },
      },
    },
  })
}

export const createQuestion = (question_data: any) => {
  return prisma.questions.create({
    data: question_data,
  })
}

export const updateQuestion = (
  question_id: number,
  question_text: string,
  explanation: string,
) => {
  return prisma.questions.update({
    where: {
      id: question_id,
    },
    data: {
      question_text,
      explanation,
    },
  })
}

export const updateChoice = async (question_id: number, choice_data: any) => {
  await prisma.choices.deleteMany({
    where: {
      question_id,
    },
  })

  return prisma.questions.update({
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
}

export const deleteQuestion = (question_id: number) => {
  return prisma.questions.delete({
    where: {
      id: question_id,
    },
  })
}
