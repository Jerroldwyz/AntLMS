import { prisma } from "."
import { Course } from "~~/types"

export const getCreatorCourseById = (course_id: number) => {
  return prisma.courses.findUnique({
    where: {
      id: course_id,
    },
    select: {
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
          title: true,
          content: {
            select: {
              title: true,
              type: true,
              content: true,
              topic_position: true,
            },
          },
          quizzes: {
            select: {
              id: true,
              title: true,
              topic_position: true,
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

export const getCreatorCourses = (creator_id: string) => {
  return prisma.courses.findMany({
    where: {
      creator_id,
    },
    select: {
      id: true,
      title: true,
      enabled: true,
      thumbnail: true,
      creator_id: true,
    },
  })
}

export const createCourse = (course_data: Course) => {
  return prisma.courses.create({
    data: {
      title: course_data.title,
      creator_id: course_data.creatorId,
      thumbnail: course_data.thumbnail,
      course_tags: {
        create: course_data.tags.map((tag: string) => ({
          tag: {
            connectOrCreate: {
              where: { name: tag },
              create: { name: tag },
            },
          },
        })),
      },
    },
    include: {
      course_tags: true,
    },
  })
}

export const updateCourseTitle = (account_id: number, course_title: string) => {
  return prisma.courses.update({
    where: {
      id: account_id,
    },
    data: {
      title: course_title,
    },
  })
}

export const updateCourseThumbnail = (course_id: number, thumbnail: string) => {
  return prisma.courses.update({
    where: {
      id: course_id,
    },
    data: {
      thumbnail,
    },
  })
}

export const disableCourseById = (course_id: number) => {
  return prisma.courses.update({
    where: {
      id: course_id,
    },
    data: {
      enabled: false,
    },
  })
}

export const enableCourseById = (course_id: number) => {
  return prisma.courses.update({
    where: {
      id: course_id,
    },
    data: {
      enabled: true,
    },
  })
}

export const setCourseEnabled = (course_id: number, enabled: boolean) => {
  return prisma.courses.update({
    where: {
      id: course_id,
    },
    data: {
      enabled,
    },
  })
}

export const deleteCourseById = (course_id: number) => {
  return prisma.courses.delete({
    where: {
      id: course_id,
    },
  })
}
