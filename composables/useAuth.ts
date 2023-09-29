import {
  createUserWithEmailAndPassword,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
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
      name: userData.name,
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

  const sendEmailVerification = () => {
    try {
      const { $firebaseAuth } = useNuxtApp()
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: "http://localhost:3000/auth/login",
        // This must be true.
        handleCodeInApp: true,
      }
      if (isSignInWithEmailLink($firebaseAuth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn")
        if (!email) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          email = window.prompt("Please provide your email for confirmation")
        } else {
          sendSignInLinkToEmail($firebaseAuth, email, actionCodeSettings).then(
            (result) => {
              window.localStorage.removeItem("emailForSignIn")
            },
          )
        }
      }
    } catch (error) {
      console.error("Error while sending verification email:", error)
    }
  }

  return {
    register,
    login,
    logout,
  }
}
