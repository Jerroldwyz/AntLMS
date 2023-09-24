import { users } from "@prisma/client"
import { faker } from "./faker"
import { createThumbnail } from "./imageHelpers"

export const createUser = async (): Promise<users> => {
  return {
    uid: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    thumbnail: await createThumbnail(),
    contact_details: {},
  }
}
