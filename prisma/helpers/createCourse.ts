import { courses, users } from "@prisma/client"
import { faker } from "./faker"
import { createCourseImage } from "./imageHelpers"

export const createCourse = async (users: users[]): Promise<courses> => {
  return {
    id: faker.number.int(),
    title: faker.company.buzzPhrase(),
    enabled: faker.datatype.boolean(),
    thumbnail: await createCourseImage(),
    creator_id: users[Math.floor(Math.random() * users.length)].uid,
  }
}
