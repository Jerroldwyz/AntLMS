import { InferType, string, object, bool } from "yup"
import { v4 as uuidv4 } from "uuid"
import { FirebaseError } from "firebase-admin/app"
import { UserRecord, getAuth } from "firebase-admin/auth"
import { createUser } from "~/server/utils/db/users"
import { useFirebaseAdmin } from "~/composables/useFirebaseAdmin.server"

export default defineEventHandler(async (event) => {
  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    name: string().required().min(1),
    email: string().required().email(),
    password: string().required().min(8),
    thumbnail: string().nullable().optional().default(null),
    contactDetails: object().optional().default({}),
    isAdmin: bool().optional().default(false),
    enabled: bool().optional().default(true),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  let createdUser: UserRecord
  const app = useFirebaseAdmin()!
  const auth = getAuth(app)

  // create user on firebase
  try {
    let newUid: string = uuidv4()
    let existingUser = await getUserById(newUid)
    if (existingUser !== null) {
      while (existingUser) {
        newUid = uuidv4()
        existingUser = await getUserById(newUid)
      }
    }

    createdUser = await auth.createUser({
      uid: newUid,
      email: body.email,
      emailVerified: false,
      password: body.password,
      displayName: body.name,
      disabled: !body.enabled,
    })
  } catch (e) {
    const error = e as unknown as FirebaseError
    throw createError({
      statusCode: 500,
      statusMessage: `Firebase admin: ${JSON.stringify(error.message)}`,
    })
  }

  const userWithoutPassword = {
    uid: createdUser.uid,
    name: createdUser.displayName,
    email: createdUser.email,
    thumbnail: body.thumbnail,
    contact_details: body.contactDetails,
    isAdmin: body.isAdmin,
    enabled: body.enabled,
  }

  // Create user in local database
  try {
    await createUser(camelCaseToUnderscore(userWithoutPassword))
  } catch (e) {
    throw prismaErrorHandler(e)
  }

  // send custom token
  try {
    return await auth.createCustomToken(userWithoutPassword.uid)
  } catch (e) {
    const error = e as unknown as FirebaseError
    throw createError({
      statusCode: 500,
      statusMessage: `firebase-admin/custome-token: ${JSON.stringify(
        error.message,
      )}`,
    })
  }
})