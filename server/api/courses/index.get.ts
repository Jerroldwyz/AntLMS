export default defineEventHandler(async (event) => {
  // TODO: This line is never used
  // const query = await getQuery(event)
  try {
    return await getAllCourses()
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
