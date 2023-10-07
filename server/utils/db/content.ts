import { prisma } from "."

export const getContentById = (content_id: number) => {
  return prisma.content.findUnique({
    where: {
      id: content_id,
    },
    select: {
      title: true,
      type: true,
      content: true,
      topic_id: true,
    },
  })
}

export const getContents = (topic_id: number) => {
  return prisma.content.findMany({
    where: {
      topic_id,
    },
    select: {
      id: true,
      title: true,
      type: true,
      content: true,
      topic_position: true,
    },
  })
}

export const createContent = (content_data: any) => {
  return prisma.content.create({
    data: content_data,
  })
}

export const updateContent = (content_id: number, content_data: any) => {
  return prisma.content.update({
    where: {
      id: content_id,
    },
    data: content_data,
  })
}

export const deleteContent = (content_id: number) => {
  return prisma.content.delete({
    where: {
      id: content_id,
    },
  })
}
