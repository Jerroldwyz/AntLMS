import { User } from "~~/types"

export default defineEventHandler(async (event) => {
  // console.log(assertMethod(event, "POST"))
  const userProps: User = await readBody(event)
  try {
    return await createUser(userProps)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
