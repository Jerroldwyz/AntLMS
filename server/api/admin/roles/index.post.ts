import { content_type, roles } from "@prisma/client"
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const prismaData: Omit<roles, "id"> = {
    name: body.name,
  }

  try {
    return await createRole(prismaData)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
