import { tags } from "@prisma/client"
import { faker } from "./faker"

export const createTags = (): tags => {
  return {
    id: faker.number.int(),
    name: faker.company.buzzNoun(),
  }
}
