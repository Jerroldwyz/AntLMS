import { prisma } from "."

export const enrollUser = (course_id: number, user_id: string) => {
  return prisma.enrollments.create({
    data: {
      user_id,
      course_id,
    },
  })
}

export const unenrollUser = (course_id: number, user_id: string) => {
  return prisma.enrollments.deleteMany({
    where: {
      course_id,
      user_id,
    },
  })
}

export const getEnrollment = (user_id: string) => {
  return prisma.enrollments.findMany({
    where: {
      user_id,
    },
    select: {
      id: true,
      course: {
        select: {
          id: true,
          title: true,
          thumbnail: true,
          creator: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })
}
