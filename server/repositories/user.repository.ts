// noted: pagination is not supported

import prisma from '../database/prisma.client'

// CREATE
export async function createUser(uid: string, email: string) {
  var newUser = null
  try {
    newUser = await prisma.user.create({
      data: {
        uid: uid,
        email: email,
      },
    })
  } catch (error) {
    throw createError({
      statusCode: 500, // internal server error
      statusMessage: 'Unable to create new user',
    })
  }

  return newUser
}

// GET ONE
export async function getUserById(uid: string) {
  var result = null
  try {
    result = await prisma.user.findUnique({
      where: {
        uid: uid,
      },
    })
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Unable to get user',
    })
  }

  return result
}

// GET ALL
export async function getAllUsers() {
  var result = null
  try {
    result = await prisma.user.findMany()
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Unable to get all users',
    })
  }

  return result
}

// UPDATE
export async function updateUser(uid: string, email: string) {
  try {
    await prisma.user.update({
      where: {
        uid: uid,
      },
      data: {
        email: email,
      },
    })

    return { message: 'User updated successfully' }
  } catch (error) {
    throw createError({
      message: `Unable to update user ${uid}`,
    })
  }
}

// DELETE BY ID
export async function deleteUserById(uid: string) {
  try {
    await prisma.user.delete({
      where: {
        uid: uid,
      },
    })
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Unable to delete user ${uid}`,
    })
  }
}
