import { prisma } from "."
import { CourseQueryStatus } from "~/types"

export const getCourseByName = (
  course_title: string,
  enabled: boolean | undefined = undefined,
) => {
  return prisma.courses.findMany({
    where: {
      title: {
        contains: course_title,
      },
      enabled,
    },
    select: {
      id: true,
      title: true,
      thumbnail: true,
    },
  })
}

export const getCourseByTagId = (
  tag_ids: number[],
  enabled: boolean | undefined = undefined,
) => {
  return prisma.courses.findMany({
    where: {
      enabled,
      course_tags: {
        some: {
          tag_id: {
            in: tag_ids,
          },
        },
      },
    },
    select: {
      id: true,
      title: true,
      thumbnail: true,
    },
  })
}

export const getCourseById = (course_id: number) => {
  return prisma.courses.findUnique({
    where: {
      id: course_id,
    },
    select: {
      id: true,
      title: true,
      enabled: true,
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

export const getAllCourses = (status: boolean | undefined = undefined) => {
  return prisma.courses.findMany({
    where: {
      enabled: status,
    },
    select: {
      id: true,
      title: true,
      enabled: true,
      thumbnail: true,
      creator: {
        select: {
          name: true,
        },
      },
    },
  })
}

export const updateCourseById = async (courseId: number, data: any) => {
  await prisma.courses.update({
    where: {
      id: courseId,
    },
    data,
  })
  return await getCourseById(courseId)
}
