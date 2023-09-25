export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const name = body.name
  const email = body.email
  const roleId = body.role_id

  console.log(body)

  try {
    return await createManager(name, email, roleId)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
