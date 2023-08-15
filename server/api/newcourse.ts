import { PrismaClient } from '@prisma/client'

export default defineEventHandler(async (e) => {
  const prisma = new PrismaClient();

  const body = await readBody(e)
  console.log(body.course)

  await prisma.course.create({
      data: {
        title: body.course.title,
        topic: body.course.topic,
        creator_id: body.course.creator_id
      }
  })

  return {
    title: body.course.title
  }
})
