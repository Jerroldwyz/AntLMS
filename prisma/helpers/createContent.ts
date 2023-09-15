import { content, topics } from "@prisma/client"
import { faker } from "./faker"

export const createContent = (topics: topics[]): content => {
  return {
    id: faker.number.int(),
    title: faker.company.buzzPhrase(),
    content: faker.lorem.paragraph(4),
    type: "TEXT",
    topic_id: topics[Math.floor(Math.random() * topics.length)].id,
    topic_position: faker.number.int(),
  }
}
