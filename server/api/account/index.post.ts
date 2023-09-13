import { User } from "~~/types"

export default defineEventHandler(async (event) => {
  // console.log(assertMethod(event, "POST"))
  const userProps: User = await readBody(event)
  return await createAccount(userProps)
})
