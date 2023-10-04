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
      topic_position: true,
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
    data: {
      content: content_data,
    },
  })
}

export const updateContentPosition = (
  content_id: number,
  content_position: number,
) => {
  return prisma.content.update({
    where: {
      id: content_id,
    },
    data: {
      topic_position: content_position,
    },
  })
}

export const updateTitle = (content_id: number, content_title: string) => {
  console.log(content_id)

  return prisma.content.update({
    where: {
      id: content_id,
    },
    data: {
      title: content_title,
    },
  })
}

export const deleteContent = (content_id: number) => {
  return prisma.content.delete({
    where: {
      id: content_id,
    },
  })
}
