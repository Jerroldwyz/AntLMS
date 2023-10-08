import { prisma } from "."
import { CourseQueryStatus } from "~/types"

export const getCourseById = (course_id: number) => {
  return prisma.courses.findUnique({
    where: {
      id: course_id,
    },
    select: {
      id: true,
      title: true,
      thumbnail: true,
      creator: {
        select: {
          name: true,
        },
      },
      topics: {
        select: {
          id: true,
          title: true,
          content: {
            select: {
              id: true,
              title: true,
              type: true,
              topic_position: true,
              progress: {
                select: {
                  user_id: true,
                },
              },
            },
          },
          quizzes: {
            select: {
              id: true,
              title: true,
              topic_position: true,
              progress: {
                select: {
                  user_id: true,
                },
              },
            },
          },
        },
      },
      course_tags: {
        select: {
          tag: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })
}

export const getAllCourses = (status: string = "all") => {
  const select = {
    id: true,
    title: true,
    enabled: true,
    thumbnail: true,
    creator: {
      select: {
        name: true,
      },
    },
  }
  let where

  switch (status) {
    case "all":
      where = {}
      break
    case "enabled":
      where = { enabled: { equals: true } }
      break
    case "disabled":
      where = { enabled: { equals: false } }
      break
    default:
      where = {}
      break
  }

  return prisma.courses.findMany({
    where,
    select,
  })
}

export const updateCourseById = (courseId: number, data: any) => {
  prisma.courses.update({
    where: {
      id: courseId,
    },
    data,
  })
}
