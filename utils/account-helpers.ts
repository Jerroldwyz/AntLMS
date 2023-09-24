export const updateAccount = async (uid: string | undefined, { ...user }) => {
  try {
    await $fetch(`/api/users/${uid}`, {
      method: "PUT",
      body: user,
    })
  } catch (error) {
    throw new Error("Cannot update account")
  }
}
