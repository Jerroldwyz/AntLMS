export default defineEventHandler(async (e) => {
  const prisma = new PrismaClient();
  const topic = await readBody(e).topic
  await prisma.course.create({
      data: {
        title: course.title
        topic: course.type
        creator: "Jamie"
      }
  })

  return {
    title: body.topic.title
  }
})
