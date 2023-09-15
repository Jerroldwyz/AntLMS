import { questions, quizzes } from "@prisma/client"
import { faker } from "./faker"

export const createQuestions = (quizzes: quizzes[]): questions => {
  return {
    id: faker.number.int(),
    quiz_id: quizzes[Math.floor(Math.random() * quizzes.length)].id,
    question_text: faker.commerce.product(),
    explanation: faker.commerce.productDescription(),
  }
}
