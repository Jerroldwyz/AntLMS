import { User } from "~~/types"

export default defineEventHandler(async (event) => {
  const userProps: User = await readBody(event)
  return await createUser(userProps)
})
