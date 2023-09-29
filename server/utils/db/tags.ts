import { prisma } from "."

export const getTagById = (tag_id: number) => {
  return prisma.tags.findUnique({
    where: {
      id: tag_id,
    },
    select: {
      name: true,
    },
  })
}

export const getTags = () => {
  return prisma.tags.findMany()
}

export const updateTag = (tag_id: number, name: string) => {
  return prisma.tags.update({
    where: {
      id: tag_id,
    },
    data: {
      name,
    },
  })
}

export const deleteTag = (tag_id: number) => {
  return prisma.tags.delete({
    where: {
      id: tag_id,
    },
  })
}
