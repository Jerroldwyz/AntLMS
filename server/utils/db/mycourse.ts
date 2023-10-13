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

export const createCourse = async (course_data: any) => {
  console.log(course_data)
  const createdData = await prisma.courses.create({
    data: {
      ...course_data,
    },
    include: {
      course_tags: true,
    },
  })
  return await getCreatorCourseById(createdData.id)
}

export const updateCourse = async (course_id: number, course_data: any) => {
  const updatedData = await prisma.courses.update({
    where: {
      id: course_id,
    },
    data: {
      ...course_data,
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
