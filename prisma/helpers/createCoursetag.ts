import { courses_tags, tags, courses } from "@prisma/client"
import { faker } from "./faker"

export const createCoursetag = (
  courses: courses[],
  tags: tags[],
): courses_tags => {
  return {
    id: faker.number.int(2147483647),
    course_id: courses[Math.floor(Math.random() * courses.length)].id,
    tag_id: tags[Math.floor(Math.random() * tags.length)].id,
  }
}
