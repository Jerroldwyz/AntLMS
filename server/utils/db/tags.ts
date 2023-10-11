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

export const getTags = async (tag_names: string) => {
  try {
    const tags = await prisma.tags.findMany({
      where: {
        name: tag_names,
      },
      select: {
        id: true, // Select only the 'id' field of the matching tags
      },
    })

    const tagIds = tags.map((tag) => tag.id)

    return tagIds
  } catch (error) {
    throw new Error(`Error fetching tags: ${error}`)
  }
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
