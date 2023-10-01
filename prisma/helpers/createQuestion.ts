import { questions, quizzes } from "@prisma/client"
import { faker } from "./faker"

export const createQuestion = (quiz: quizzes): questions => {
  return {
    id: faker.number.int(2147483647),
    quiz_id: quiz.id,
    question_text: faker.commerce.product(),
    explanation: faker.commerce.productDescription(),
  }
}

export const createMultipleQuestions = (quiz: quizzes): questions[] => {
  const questions: questions[] = []
  for (let i = 0; i < 4; i++) {
    questions.push({
      id: faker.number.int(2147483647),
      quiz_id: quiz.id,
      question_text: faker.commerce.product(),
      explanation: faker.commerce.productDescription(),
    })
  }
  return questions
}
