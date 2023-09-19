export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    // all, enabled, disabled
    const status: "all" | "enabled" | "disabled" = query.status ?? "all"
    return await getAllCourses(status)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
