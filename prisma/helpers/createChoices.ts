import { questions, choices } from "@prisma/client"
import { faker } from "./faker"

export const createChoices = (questions: questions[]): choices => {
  return {
    id: faker.number.int(),
    question_id: questions[Math.floor(Math.random() * questions.length)].id,
    choice_text: faker.commerce.productAdjective(),
    is_correct: faker.datatype.boolean(),
  }
}
