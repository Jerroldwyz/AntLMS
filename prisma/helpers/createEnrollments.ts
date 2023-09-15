import { courses, users, enrollments } from "@prisma/client"
import { faker } from "./faker"

export const createEnrollment = (
  users: users[],
  courses: courses[],
): enrollments => {
  return {
    id: faker.number.int(),
    user_id: users[Math.floor(Math.random() * users.length)].uid,
    course_id: courses[Math.floor(Math.random() * courses.length)].id,
  }
}
