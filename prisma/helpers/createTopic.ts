import { topics, courses } from "@prisma/client"
import { faker } from "./faker"

export const createTopic = (courses: courses[]): topics => {
  return {
    id: faker.number.int(2147483647),
    course_id: courses[Math.floor(Math.random() * courses.length)].id,
    title: faker.company.buzzPhrase(),
    position: faker.number.int(2147483647),
  }
}

export const createMultipleTopics = (course: courses): topics[] => {
  const topics: topics[] = []
  for (let i = 0; i < 4; i++) {
    topics.push({
      id: faker.number.int(2147483647),
      course_id: course.id,
      title: faker.company.buzzPhrase(),
      position: faker.number.int(2147483647),
    })
  }
  return topics
}
