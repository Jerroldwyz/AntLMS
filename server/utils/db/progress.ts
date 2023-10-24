import { progress } from "@prisma/client"
import { prisma } from "."

export const completeContent = (data: Omit<progress, "id">) => {
  return prisma.progress.create({
    data,
  })
}

export const contentCompleted = (enrollmentId: number, contentId: number) => {
  return prisma.progress.findFirst({
    where: {
      enrollment_id: enrollmentId,
      content_id: contentId,
    },
  })
}
