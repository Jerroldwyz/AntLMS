export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    return await updateCourseThumbnail(
      parseInt(body.courseId as string),
      body.thumbnail as string,
    )
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
