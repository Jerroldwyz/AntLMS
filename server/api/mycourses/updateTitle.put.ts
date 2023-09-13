export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  console.log("a" + body.title)

  return await updateCourseTitle(
    parseInt(body.courseId as string),
    body.title as string,
  )
})
