import { quiz_progress, enrollments, quizzes, users } from "@prisma/client"
import { faker } from "./faker"

export const createQuizProgress = (
  enrollments: enrollments[],
  quizzes: quizzes[],
  users: users[],
): quiz_progress => {
  return {
    id: faker.number.int(2147483647),
    quiz_id: quizzes[Math.floor(Math.random() * quizzes.length)].id,
    user_id: users[Math.floor(Math.random() * users.length)].uid,
    enrollment_id:
      enrollments[Math.floor(Math.random() * enrollments.length)].id,
  }
}
