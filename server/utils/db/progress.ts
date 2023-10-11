import { progress } from "@prisma/client"
import { prisma } from "."

export const completeContent = (data: Omit<progress, "id">) => {
  return prisma.progress.create({
    data,
  })
}
