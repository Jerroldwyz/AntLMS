import { CourseQueryStatus } from "~/types"

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    // all, enabled, disabled
    const courseQueryString = query.status ?? "all"
    let queryStatus: CourseQueryStatus = CourseQueryStatus.all

    switch (courseQueryString) {
      case "all":
        queryStatus = CourseQueryStatus.all
        break
      case "enabled":
        queryStatus = CourseQueryStatus.enabled
        break
      case "disabled":
        queryStatus = CourseQueryStatus.disabled
        break
      default:
        return sendError(
          event,
          new Error(
            `Query: status can only be "all", "enabled" or "disabled", ${courseQueryString} is not allowed`,
          ),
        )
        break
    }
    return await getAllCourses(queryStatus)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
