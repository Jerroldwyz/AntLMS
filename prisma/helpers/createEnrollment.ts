import { courses, users, enrollments } from "@prisma/client"
import { faker } from "./faker"

export const createEnrollment = (
  user: users,
  courses: courses[],
): enrollments => {
  return {
    id: faker.number.int(2147483647),
    user_id: user.uid,
    course_id: courses[Math.floor(Math.random() * courses.length)].id,
  }
}
