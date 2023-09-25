import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"

export const useAuth = () => {
  const register = async ({ ...userData }) => {
    const { $firebaseAuth } = useNuxtApp()
    const userCredentials = await createUserWithEmailAndPassword(
      $firebaseAuth,
      userData.email,
      userData.password,
    )

    const firebaseUser = userCredentials.user

    const userProps = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      name: `${userData.firstName} ${userData.lastName}`,
      contact_details: {
        phone_number: userData.phone_number,
      },
    }
    await $fetch("/api/signup", {
      method: "POST",
      body: userProps,
    })
      .catch((error) => console.error(error))
      .then(() => console.log("You have register"))

    return firebaseUser
  }

  const login = async (email: string, password: string) => {
    const { $firebaseAuth } = useNuxtApp()
    await signInWithEmailAndPassword($firebaseAuth, email, password)
  }

  const logout = async () => {
    const { $firebaseAuth } = useNuxtApp()
    await signOut($firebaseAuth)
  }

  return {
    register,
    login,
    logout,
  }
}
