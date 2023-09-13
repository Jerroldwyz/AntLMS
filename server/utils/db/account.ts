import { prisma } from "."
import { User } from "~~/types"

// TODO create account
export const createAccount = async (user: User) => {
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

export const getAccountById = (account_id: string) => {
  return prisma.users.findUnique({
    where: {
      uid: account_id,
    },
    select: {
      email: true,
      name: true,
      contact_details: true,
    },
  })
}

export const updateAccount = (account_id: string, contact_details = {}) => {
  return prisma.users.update({
    where: {
      uid: account_id,
    },
    data: {
      contact_details,
    },
  })
}

export const deleteAccount = (account_id: string) => {
  return prisma.users.delete({
    where: {
      uid: account_id,
    },
  })
}
