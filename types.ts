import { JsonObject } from "@prisma/client/runtime/library"

export type UserData = {
  id: number
  name: string
  email: string
  gender: string
  // Add profilePicture field
  profilePicture: File | null
}

export type User = {
  uid: string
  name: string
  email: string
  contact_details: JsonObject
}

export type Course = {
  title: string
  thumbnail: string
  tags: string[]
  creatorId: string
}
