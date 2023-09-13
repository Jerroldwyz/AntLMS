export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return await changeEnabled(
    parseInt(body.courseId as string),
    body.enabled as boolean
  )
})
