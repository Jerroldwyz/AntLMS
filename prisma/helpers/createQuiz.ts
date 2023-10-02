import { quizzes, topics } from "@prisma/client"
import { faker } from "./faker"

export const createQuiz = (topic: topics): quizzes => {
  return {
    id: faker.number.int(2147483647),
    topic_id: topic.id,
    title: faker.company.buzzPhrase(),
    topic_position: faker.number.int(2147483647),
  }
}
