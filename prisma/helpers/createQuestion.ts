import { questions, quizzes } from "@prisma/client"
import { faker } from "./faker"

export const createQuestion = (quizzes: quizzes[]): questions => {
  return {
    id: faker.number.int(2147483647),
    quiz_id: quizzes[Math.floor(Math.random() * quizzes.length)].id,
    question_text: faker.commerce.product(),
    explanation: faker.commerce.productDescription(),
  }
}
