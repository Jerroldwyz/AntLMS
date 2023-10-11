import { prisma } from "."

export const getTagById = (tag_id: number) => {
  return prisma.tags.findUnique({
    where: {
      id: tag_id,
    },
    select: {
      id: true,
      name: true,
    },
  })
}

export const getTags = () => {
  return prisma.tags.findMany()
}

export const updateTag = (tag_id: number, data: any) => {
  return prisma.tags.update({
    where: {
      id: tag_id,
    },
    data,
  })
}

export const deleteTag = (tag_id: number) => {
  return prisma.tags.delete({
    where: {
      id: tag_id,
    },
  })
}

export const createTag = (data: any) => {
  return prisma.tags.create({
    data,
  })
}
