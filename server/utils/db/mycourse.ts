import { prisma } from "."

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
          id: true,
          title: true,
          position: true,
          content: {
            select: {
              id: true,
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

export const createCourse = (data: any) => {
  return prisma.courses.create({
    data,
    include: {
      course_tags: true,
    },
  })
}

export const updateCourse = (course_id: number, course_data: any) => {
  return prisma.courses.update({
    where: {
      id: course_id,
    },
    data: {
      ...course_data,
    },
  })
}

export const disableCourse = (course_id: number) => {
  return prisma.courses.update({
    where: {
      id: course_id,
    },
    data: {
      enabled: false,
    },
  })
}

export const enableCourse = (course_id: number) => {
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

export const deleteCourse = (course_id: number) => {
  return prisma.courses.delete({
    where: {
      id: course_id,
    },
  })
}
