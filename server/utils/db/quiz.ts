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
      topic_position: true,
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
      id: true,
      title: true,
      topic_id: true,
      threshold: true,
      topic_position: true,
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

export const createQuiz = async (quiz_data: any) => {
  const newQuiz = await prisma.quizzes.create({
    data: quiz_data,
  })
  return await getQuizById(newQuiz.id)
}

export const updateQuiz = async (quiz_id: number, quiz_data: any) => {
  const updatedQuiz = await prisma.quizzes.update({
    where: {
      id: quiz_id,
    },
    data: quiz_data,
  })
  return await getQuizById(updatedQuiz.id)
}

export const deleteQuiz = async (quiz_id: number) => {
  const prefetchedQuiz = await getQuizById(quiz_id)
  await prisma.quizzes.delete({
    where: {
      id: quiz_id,
    },
  })
  return prefetchedQuiz
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
  if (progress.length === 0) {
    return await prisma.quiz_progress.create({
      data,
    })
  }
}
