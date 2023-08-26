import { JsonObject } from '@prisma/client/runtime/library'

export type IUser = {
  uid: string
  name: string
  email: string
  contact_details: JsonObject
}
