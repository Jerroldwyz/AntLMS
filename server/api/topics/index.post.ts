export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const prismaQuery = {
    course_id: body.courseId,
    title: body.title,
  }

  try {
    return await createTopic(prismaQuery)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
