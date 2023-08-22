import { createUser } from '~~/server/repositories/user.repository'

export default defineEventHandler(async (event) => {
  // TODO: autorized API session
  const { uid, email } = await readBody(event)
  const user = await createUser(uid, email)
  return user
})
