export default defineEventHandler(async (event) => {
  // TODO add logic to ensure a user can only change their own course
  const { id } = getRouterParam(event, "id")

  return await enableCourse(id)
})
