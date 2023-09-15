import { quiz_score, enrollments, quizzes, users } from "@prisma/client"
import { faker } from "./faker"

export const createQuizzes = (
  enrollments: enrollments[],
  quizzes: quizzes[],
  users: users[],
): quiz_score => {
  return {
    id: faker.number.int(),
    quiz_id: quizzes[Math.floor(Math.random() * quizzes.length)].id,
    user_id: users[Math.floor(Math.random() * users.length)].uid,
    enrollment_id:
      enrollments[Math.floor(Math.random() * enrollments.length)].id,
    total_marks: faker.number.int(),
    score: faker.number.int(),
  }
}
