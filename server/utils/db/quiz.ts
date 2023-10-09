import { prisma } from "."

export const getQuizzes = (topicId: number) => {
  const quiz = prisma.quizzes.findMany({
    where: {
      topic_id: topicId,
    },
    select: {
      id: true,
      title: true,
      topic_id: true,
      threshold: true,
      questions: {
        select: {
          id: true,
          question_text: true,
          explanation: true,
          choices: {
            select: {
              id: true,
              choice_text: true,
              is_correct: true,
            },
          },
        },
      },
    },
  })

  return quiz
}

export const getQuizById = (quiz_id: number) => {
  const quiz = prisma.quizzes.findUnique({
    where: {
      id: quiz_id,
    },
    select: {
      title: true,
      topic_id: true,
      threshold: true,
      questions: {
        select: {
          id: true,
          question_text: true,
          explanation: true,
          choices: {
            select: {
              id: true,
              choice_text: true,
              is_correct: true,
            },
          },
        },
      },
    },
  })

  return quiz
}

export const createQuiz = (quiz_data: any) => {
  return prisma.quizzes.create({
    data: quiz_data,
  })
}

export const updateQuiz = (quiz_id: number, quiz_data: any) => {
  return prisma.quizzes.update({
    where: {
      id: quiz_id,
    },
    data: quiz_data,
  })
}

export const updateQuizTitle = (quiz_id: number, quiz_title: string) => {
  return prisma.quizzes.update({
    where: {
      id: quiz_id,
    },
    data: {
      title: quiz_title,
    },
  })
}

export const updateQuizPosition = (quiz_id: number, quiz_position: number) => {
  return prisma.quizzes.update({
    where: {
      id: quiz_id,
    },
    data: {
      topic_position: quiz_position,
    },
  })
}

export const deleteQuiz = (quiz_id: number) => {
  return prisma.quizzes.delete({
    where: {
      id: quiz_id,
    },
  })
}

export const evaluateQuiz = (result: number[]) => {
  return prisma.choices.findMany({
    where: {
      id: { in: result },
    },
  })
}

export const quizPassed = async (data: any) => {
  const progress = await prisma.quiz_progress.findMany({
    where: {
      user_id: data.user_id,
      quiz_id: data.quiz_id,
    },
  })
  console.log(progress)
  if (progress.length === 0) {
    console.log("x")

    return await prisma.quiz_progress.create({
      data,
    })
  }
}
