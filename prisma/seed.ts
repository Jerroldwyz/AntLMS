import { PrismaClient } from "@prisma/client"
import { generateData } from "./helpers/index"

const prisma = new PrismaClient()

const seed = async () => {
  // Insert all data here
  await generateData(prisma, 50)
}

const main = async () => {
  try {
    await seed()
    await prisma.$disconnect()
  } catch (e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }
}

main()
