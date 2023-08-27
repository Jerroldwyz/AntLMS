import { createAccount } from '~~/server/db/account'
import { IUser } from '~~/types'

export default defineEventHandler(async (event) => {
  console.log(assertMethod(event, 'POST'))
  const userProps: IUser = await readBody(event)
  return await createAccount(userProps)
})
