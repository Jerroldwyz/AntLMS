import { prisma } from "."

export const getCreatorCourseById = (course_id: number) => {
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

export const createCourse = async (data: any) => {
  const createdData = await prisma.courses.create({
    data: {
      ...data,
      course_tags: {
        create: data.course_tags.map((tag: string) => ({
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
  return await getCreatorCourseById(createdData.id)
}

export const updateCourseById = async (course_id: number, course_data: any) => {
  const updatedData = await prisma.courses.update({
    where: {
      id: course_id,
    },
    data: {
      title: course_data.title,
      enabled: course_data.enabled,
      thumbnail: course_data.thumbnail,
      topics: {
        create: course_data.topics.map((topic: string) => ({
          topic: {
            connectOrCreate: {
              where: { name: topic },
              create: { name: topic },
            },
          },
        })),
      },
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
  })
  return await getCreatorCourseById(updatedData.id)
}

export const deleteCourse = async (course_id: number) => {
  const prefetchedData = await getCreatorCourseById(course_id)
  await prisma.courses.delete({
    where: {
      id: course_id,
    },
  })
  return prefetchedData
}
