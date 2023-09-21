import { prisma } from "."
import { User } from "~~/types"

// TODO create user
export const createUser = async (user: User) => {
  let newUser = null
  try {
    newUser = await prisma.users.create({
      data: {
        uid: user.uid,
        name: user.name,
        email: user.email,
        contact_details: user.contact_details,
      },
    })
  } catch (error) {
    throw createError({
      statusCode: 500, // internal server error
      statusMessage: "Unable to create new user",
    })
  }

  return newUser
}

export const getAllUsers = async () => {
  return await prisma.users.findMany()
}

export const getUserById = (user_id: string) => {
  return prisma.users.findUnique({
    where: {
      uid: user_id,
    },
    select: {
      email: true,
      name: true,
      contact_details: true,
    },
  })
}

export const updateUser = (user_id: string, contact_details = {}) => {
  return prisma.users.update({
    where: {
      uid: user_id,
    },
    data: {
      contact_details,
    },
  })
}

export const deleteUser = (user_id: string) => {
  return prisma.users.delete({
    where: {
      uid: user_id,
    },
  })
}
