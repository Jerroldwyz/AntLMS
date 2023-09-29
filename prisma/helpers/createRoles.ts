import { roles } from "@prisma/client"
import { faker } from "./faker"

export const createRole = (): roles => {
  return {
    id: faker.number.int(2147483647),
    name: faker.person.firstName(),
  }
}
