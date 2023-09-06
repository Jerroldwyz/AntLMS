import { JsonObject } from "@prisma/client/runtime/library"

export type User = {
  uid: string
  name: string
  email: string
  contact_details: JsonObject
}

export type Course = {
  title: string
  creatorId: string
  thumbnail: string
  tags: string[]
}
