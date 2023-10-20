import { UserRecord } from "firebase-admin/auth"
import { createUser } from "~/server/utils/db/users"

export default defineEventHandler(async (event) => {
  const { user }: { user: UserRecord } = await readBody(event)
  const firebaseUid = user.uid

  const existingUser = await getUserById(firebaseUid)
  if (existingUser) {
    return existingUser
  } else {
    const newUser = {
      uid: firebaseUid,
      name: user.displayName,
      email: user.email,
      thumbnail: null,
      is_admin: user.customClaims && user.customClaims.admin,
      enabled: !user.disabled,
    }

    return await createUser(camelCaseToUnderscore(newUser))
  }
})
