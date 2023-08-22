import prisma from './prisma.client'

export async function createUser({
  email,
  firstName,
  lastName,
}: {
  email: string
  firstName: string
  lastName: string
}) {
  try {
  } catch (error) {
    createError({
      statusCode: 500, // internal server error
      statusMessage: 'Unable to create new user',
    })
  }
  const newUser = await prisma.user.create({
    data: {
      email: email,
    },
  })
}

export async function getUsers() {
  const users = await prisma.user.findMany({
    include: {},
  })
}

export async function getUser(id: string) {}
