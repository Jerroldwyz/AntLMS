export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    return await updateCourseTitle(
      parseInt(body.courseId as string),
      body.title as string,
    )
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
