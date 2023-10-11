import { getEnrolledCourse } from "~/server/utils/db/enrollment"

export default defineEventHandler(async (event) => {
  const userUid = getRouterParam(event, "id")
  const courseId = getRouterParam(event, "course_id")

  const enrollment = await getEnrolledCourse(
    userUid as string,
    parseInt(courseId as string),
  )

  if (!enrollment) {
    throw createError({
      statusCode: 404,
      statusMessage: "Cannot find your enrolled course",
    })
  }

  enrollment.course.topics.forEach((topic) => {
    topic.content.sort((a, b) => a.topic_position - b.topic_position)
  })

  return enrollment
})
