import { questions, choices } from "@prisma/client"
import { faker } from "./faker"

export const createChoice = (questions: questions[]): choices => {
  return {
    id: faker.number.int(2147483647),
    question_id: questions[Math.floor(Math.random() * questions.length)].id,
    choice_text: faker.commerce.productAdjective(),
    is_correct: faker.datatype.boolean(),
  }
}

export const createMultipleChoices = (question: questions): choices[] => {
  const choices: choices[] = []
  for (let i = 0; i < 4; i++) {
    choices.push({
      id: faker.number.int(2147483647),
      question_id: question.id,
      choice_text: faker.commerce.productAdjective(),
      is_correct: faker.datatype.boolean(),
    })
  }
  return choices
}
