import { User } from "~~/types"

export default defineEventHandler(async (event) => {
  // console.log(assertMethod(event, "POST"))
  const userProps: User = await readBody(event)
  try {
    return await createAccount(userProps)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
