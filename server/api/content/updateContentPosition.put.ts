import { updateContentPosition } from "~~/server/db/content"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return await updateContentPosition(
    parseInt(body.contentId as string),
    parseInt(body.contentPosition as string)
  )
})
