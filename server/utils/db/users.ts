import { prisma } from "."

export const createUser = async (data: any) => {
  const newUser = await prisma.users.create({
    data,
  })
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
      thumbnail: true,
      contact_details: true,
      is_admin: true,
      enabled: true,
    },
  })
}

export const updateUserById = (user_id: string, data: any) => {
  return prisma.users.update({
    where: {
      uid: user_id,
    },
    data,
  })
}

export const deleteUser = (user_id: string) => {
  return prisma.users.delete({
    where: {
      uid: user_id,
    },
  })
}
