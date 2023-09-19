export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    return await changeEnabled(
      parseInt(body.courseId as string),
      body.enabled as boolean,
    )
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
