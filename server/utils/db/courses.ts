import { prisma } from "."
import { CourseQueryStatus } from "~/types"

export const getCourseById = (course_id: number) => {
  return prisma.courses.findUnique({
    where: {
      id: course_id,
    },
    select: {
      title: true,
      thumbnail: true,
      creator: {
        select: {
          name: true,
        },
      },
      topics: {
        select: {
          title: true,
          content: {
            select: {
              id: true,
              title: true,
              type: true,
              topic_position: true,
              content: true,
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
              quiz_score: true,
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

export const getAllCourses = (
  status: CourseQueryStatus = CourseQueryStatus.all,
) => {
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
    case CourseQueryStatus.all:
      where = {}
      break
    case CourseQueryStatus.enabled:
      where = { enabled: { equals: true } }
      break
    case CourseQueryStatus.disabled:
      where = { enabled: { equals: false } }
      break

    default:
      break
  }

  return prisma.courses.findMany({
    where,
    select,
  })
}
