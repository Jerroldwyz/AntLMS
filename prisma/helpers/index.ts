import { PrismaClient, users, courses } from ".prisma/client"
import { createTempDir, cleanupTempDir } from "./fileHelpers"
import { createUser } from "./createUser"
import { createCourse } from "./createCourse"

export const generateData = async (prisma: PrismaClient, amount: number) => {
  createTempDir()

  const users: users[] = []
  const coursePromises: Promise<courses>[] = []

  for (let i = 0; i < amount; i++) {
    users.push(createUser())
  }
  for (let i = 0; i < amount; i++) {
    coursePromises.push(createCourse(users))
  }

  const courses: courses[] = await Promise.all(coursePromises)

  await prisma.users.createMany({
    data: users.map((user) => {
      return {
        ...user,
        contact_details: JSON.stringify(user.contact_details),
      }
    }),
    skipDuplicates: true,
  })

  await prisma.courses.createMany({
    data: courses,
    skipDuplicates: true,
  })

  cleanupTempDir()
}
