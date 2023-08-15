import { PrismaClient } from '@prisma/client'

export default defineEventHandler(async (e) => {
  const prisma = new PrismaClient();

  const body = await readBody(e)
  console.log(body.course)
  await prisma.course.create({
      data: {
        title: body.course.title,
        topic: body.course.topic,
        creator_id: 1
      }
  })

  return {
    title: body.course.title
  }
})
