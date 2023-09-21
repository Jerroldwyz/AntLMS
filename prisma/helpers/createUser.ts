import { users } from "@prisma/client"
import { faker } from "./faker"

export const createUser = (): users => {
  return {
    uid: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    contact_details: {},
    is_admin: faker.datatype.boolean(),
  }
}
