import { users } from "@prisma/client"
import { faker } from "./faker"
import { createThumbnail } from "./imageHelpers"

export const createUser = async (): Promise<users> => {
  return {
    uid: createUid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    thumbnail: await createThumbnail(),
    contact_details: {},
    is_admin: faker.datatype.boolean(),
    enabled: faker.datatype.boolean(),
  }
}

export const createUid = () => {
  return faker.string.alphanumeric({ length: { min: 20, max: 38 } })
}
