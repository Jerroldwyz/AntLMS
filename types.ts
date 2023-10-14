import { JsonObject } from "@prisma/client/runtime/library"

export enum CourseQueryStatus {
  all,
  enabled,
  disabled,
}

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
  thumbnail: string | null
  contact_details: JsonObject
}

export type Course = {
  title: string
  thumbnail: string
  courseTags: string[]
  creatorId: string
}

export type ApiRole = {
  id: number
  name: string
  permissions: {
    id: number
    name: string
  }[]
}

export type ApiManager = {
  uid: string
  name: string
  email: string
  roles: ApiRole[]
}
