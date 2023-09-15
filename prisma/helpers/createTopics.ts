import { topics, courses } from "@prisma/client"
import { faker } from "./faker"

export const createTopic = (courses: courses[]): topics => {
  return {
    id: faker.number.int(),
    course_id: courses[Math.floor(Math.random() * courses.length)].id,
    title: faker.company.buzzPhrase(),
  }
}
