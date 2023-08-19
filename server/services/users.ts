import prisma from './prisma.client'

export async function getUsers() {
  const users = await prisma.user.findMany({
    include: {},
  })
}

export async function getUser(id: string) {}

export async function createUser(email: string) {}
