import { users, enrollments, progress, content } from "@prisma/client"
import { faker } from "./faker"

export const createProgress = (
  users: users[],
  enrollments: enrollments[],
  contents: content[],
): progress => {
  return {
    id: faker.number.int(2147483647),
    user_id: users[Math.floor(Math.random() * users.length)].uid,
    content_id: contents[Math.floor(Math.random() * contents.length)].id,
    enrollment_id:
      enrollments[Math.floor(Math.random() * enrollments.length)].id,
  }
}
