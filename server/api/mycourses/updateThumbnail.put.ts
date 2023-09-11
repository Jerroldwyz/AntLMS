export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return await updateCourseThumbnail(
    parseInt(body.courseId as string),
    body.thumbnail as string
  )
})
