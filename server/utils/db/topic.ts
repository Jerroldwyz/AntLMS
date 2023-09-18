import { prisma } from "."

export const getTopicById = (topic_id: number) => {
  return prisma.topics.findUnique({
    where: {
      id: topic_id,
    },
    select: {
      title: true,
    },
  })
}

export const getTopics = (course_id: number) => {
  return prisma.topics.findMany({
    where: {
      course_id,
    },
    select: {
      id: true,
      title: true,
    },
  })
}

export const createTopic = (topic_data: any) => {
  return prisma.topics.create({
    data: topic_data,
  })
}

export const updateTopicTitle = (topic_id: number, topic_title: string) => {
  return prisma.topics.update({
    where: {
      id: topic_id,
    },
    data: {
      title: topic_title,
    },
  })
}

export const deleteTopic = (topic_id: number) => {
  return prisma.topics.delete({
    where: {
      id: topic_id,
    },
  })
}
