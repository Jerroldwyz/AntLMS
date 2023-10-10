import { prisma } from "."

export const getTopicById = (topic_id: number) => {
  return prisma.topics.findUnique({
    where: {
      id: topic_id,
    },
    select: {
      id: true,
      title: true,
      course_id: true,
      content: true,
      position: true,
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
      course_id: true,
      content: true,
      position: true,
    },
  })
}

export const createTopic = async (topic_data: any) => {
  const createdTopic = await prisma.topics.create({
    data: topic_data,
  })
  return await getTopicById(createdTopic.id)
}

export const updateTopicTitle = async (
  topic_id: number,
  topic_title: string,
) => {
  const updatedData = await prisma.topics.update({
    where: {
      id: topic_id,
    },
    data: {
      title: topic_title,
    },
  })
  return await getTopicById(updatedData.id)
}

export const deleteTopic = async (topic_id: number) => {
  const prefetchedTopic = await getTopicById(topic_id)
  await prisma.topics.delete({
    where: {
      id: topic_id,
    },
  })
  return prefetchedTopic
}
