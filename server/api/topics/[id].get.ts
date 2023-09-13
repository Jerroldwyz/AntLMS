export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  return await getTopicById(parseInt(id as string))
})
