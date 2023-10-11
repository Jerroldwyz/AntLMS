import { prisma } from "."

export const getContentById = (content_id: number) => {
  return prisma.content.findUnique({
    where: {
      id: content_id,
    },
    select: {
      id: true,
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
      topic_id: true,
    },
  })
}

export const createContent = async (content_data: any) => {
  const newContent = await prisma.content.create({
    data: content_data,
  })
  return getContentById(newContent.id)
}

export const updateContent = async (content_id: number, content_data: any) => {
  const updateContent = await prisma.content.update({
    where: {
      id: content_id,
    },
    data: content_data,
  })
  return getContentById(updateContent.id)
}

export const deleteContent = async (content_id: number) => {
  const prefetchedContent = await getContentById(content_id)
  await prisma.content.delete({
    where: {
      id: content_id,
    },
  })
  return prefetchedContent
}
