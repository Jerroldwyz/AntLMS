import { quiz_score, enrollments, quizzes, users } from "@prisma/client"
import { faker } from "./faker"

export const createQuizscore = (
  enrollments: enrollments[],
  quizzes: quizzes[],
  users: users[],
): quiz_score => {
  return {
    id: faker.number.int(2147483647),
    quiz_id: quizzes[Math.floor(Math.random() * quizzes.length)].id,
    user_id: users[Math.floor(Math.random() * users.length)].uid,
    enrollment_id:
      enrollments[Math.floor(Math.random() * enrollments.length)].id,
    total_marks: faker.number.int(2147483647),
    score: faker.number.int(2147483647),
  }
}
