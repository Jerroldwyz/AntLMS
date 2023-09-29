import { permissions } from "@prisma/client"
import { faker } from "./faker"

export const createPermissions = (): permissions => {
  return {
    id: faker.number.int(2147483647),
    name: faker.person.firstName(),
  }
}
