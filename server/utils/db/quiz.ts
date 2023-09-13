import { prisma } from "."

export const getQuizById = (quiz_id: number) => {
  return prisma.quizzes.findUnique({
    where: {
      id: quiz_id,
    },
    select: {
      title: true,
      topic_id: true,
      questions: {
        select: {
          id: true,
          question_text: true,
          explanation: true,
          choices: {
            select: {
              id: true,
              choice_text: true,
            },
          },
        },
      },
    },
  })
}

export const getMyCourseQuizById = (quiz_id: number) => {
  return prisma.quizzes.findUnique({
    where: {
      id: quiz_id,
    },
    select: {
      title: true,
      topic_id: true,
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
}

export const createQuiz = (quiz_data: any) => {
  return prisma.quizzes.create({
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

export const storeQuizResult = (
  result: any,
  enrollment_id: number,
  user_id: string,
  quiz_id: number,
) => {
  return prisma.quiz_score.create({
    data: {
      enrollment_id,
      user_id,
      quiz_id,
      score: result.correctAnswer,
      total_marks: result.totalQuestion,
    },
  })
}

export const storeExistingQuizResult = (result: any, quiz_score_id: number) => {
  return prisma.quiz_score.update({
    where: {
      id: quiz_score_id,
    },
    data: {
      score: result.correctAnswer,
      total_marks: result.totalQuestion,
    },
  })
}

export const getQuizResult = (user_id: string, quiz_id: number) => {
  return prisma.quiz_score.findMany({
    where: {
      user_id,
      quiz_id,
    },
    select: {
      id: true,
      score: true,
      total_marks: true,
    },
  })
}
