import { JsonObject } from "@prisma/client/runtime/library"

export enum CourseQueryStatus {
  all,
  enabled,
  disabled,
}

export type User = {
  is_admin: boolean
  uid: string
  name: string
  email: string
  thumbnail: string | null
  contact_details: JsonObject
}

export type Course = {
  title: string
  thumbnail: string
  tags: string[]
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
