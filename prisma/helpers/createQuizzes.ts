import { quizzes, topics } from "@prisma/client"
import { faker } from "./faker"

export const createQuizzes = (topics: topics[]): quizzes => {
  return {
    id: faker.number.int(),
    topic_id: topics[Math.floor(Math.random() * topics.length)].id,
    title: faker.company.buzzPhrase(),
    topic_position: faker.number.int(),
  }
}
