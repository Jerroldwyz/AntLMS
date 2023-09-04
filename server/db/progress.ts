import { prisma } from "."

export const completeContent = (data: any) => {
  return prisma.progress.create({
    data: data,
  })
}
