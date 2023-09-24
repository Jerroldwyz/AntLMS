export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const signInUser = await getAccountById(body.uid)
  if (!signInUser) {
    return await createAccount({
      uid: body.uid,
      name: body.name || "",
      email: body.email,
      contact_details: body.contact_details || JSON.stringify({}),
    })
  }

  return signInUser
})
