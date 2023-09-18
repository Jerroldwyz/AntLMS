export default defineEventHandler(async (event) => {
  const courseId = getRouterParam(event, "id")
  const body = await readBody(event)

  if (body.thumbnail) {
    await updateCourseThumbnail(
      parseInt(courseId as string),
      body.thumbnail as string,
    )
  }

  if (body.title) {
    await updateCourseTitle(parseInt(courseId as string), body.title as string)
  }

  return 0
})
