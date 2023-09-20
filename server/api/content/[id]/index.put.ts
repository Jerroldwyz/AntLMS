export default defineEventHandler(async (event) => {
  const contentId = getRouterParam(event, "id")
  const body = await readBody(event)

  try {
    if (body.content) {
      await updateContent(parseInt(contentId as string), body.content as string)
    }

    if (body.contentPosition) {
      await updateContentPosition(
        parseInt(contentId as string),
        parseInt(body.contentPosition as string),
      )
    }

    if (body.title) {
      await updateTitle(parseInt(contentId as string), body.title as string)
    }

    return 0
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
