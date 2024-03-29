import { tags } from "@prisma/client"
import { faker } from "./faker"

export const createTags = (): tags => {
  return {
    id: faker.number.int(2147483647),
    name: `${faker.company.buzzNoun()}`,
  }
}
