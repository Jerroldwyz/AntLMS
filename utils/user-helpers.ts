import { User } from "~~/types"

export async function fetchUser(uid: string | string[]): Promise<any> {
  // TODO: add type
  const user = await $fetch(`/api/users/${uid}`, {
    method: "get",
  })

  return user
}

export async function createUser(user: User): Promise<any> {
  // TODO: Validate user data before sending it to the server
  await $fetch("/api/users", {
    method: "post",
    body: {
      ...user,
    },
  })
}

export async function updateUser(
  uid: string,
  updatedUser: Partial<User>,
): Promise<void> {
  // TODO: Validate updatedUser data before sending it to the server
  await $fetch(`/api/users/${uid}`, {
    method: "put",
    body: {
      ...updatedUser,
    },
  })
}

export async function deleteUser(uid: string): Promise<any> {
  // TODO: Is validation needed here? Or in the backend?
  await $fetch(`/api/users/${uid}`, {
    method: "DELETE",
  })
}

export async function fetchAllUsers(): Promise<any> {
  try {
    const response = await $fetch("/api/users", {
      method: "get",
    })

    return response // Return the raw response
  } catch (error) {
    console.error("Error fetching user data:", error)
    return null // Return null in case of an exception
  }
}
