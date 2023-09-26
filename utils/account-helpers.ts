export const updateAccount = async (uid: string | undefined, { ...user }) => {
  try {
    const data = await $fetch(`/api/users/${uid}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: user,
    })

    return data
  } catch (error) {
    throw new Error("Cannot update account")
  }
}
