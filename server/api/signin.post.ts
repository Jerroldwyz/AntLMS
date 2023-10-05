export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const signInUser = await getUserById(body.uid)

  if (!signInUser) {
    return await createUser({
      uid: body.uid,
      name: body.name || "",
      email: body.email,
      thumbnail: body.thumbnail || "",
      contact_details: body.contact_details || JSON.stringify({}),
    })
  }

  return signInUser
})
