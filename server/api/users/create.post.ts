import { createUser } from '~~/server/repositories/user.repository'

export default defineEventHandler(async (event) => {
  // TODO: autorized API session
  const { uid, email } = await readBody(event)
  console.log(`[/api/users/create] ${uid} ${email}`)
  const user = await createUser(uid, email)
  return user
})
