import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
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
    }
    return await $fetch("/api/auth/signup", {
      method: "POST",
      body: userProps,
    })
  }

  const login = async (email: string, password: string) => {
    const { $firebaseAuth } = useNuxtApp()
    return await signInWithEmailAndPassword($firebaseAuth, email, password)
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

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const { $firebaseAuth } = useNuxtApp()
    try {
      return await signInWithPopup($firebaseAuth, provider).catch(
        function (error) {
          if (error.code === "auth/account-exists-with-different-credential") {
            const pendingCred = error.credential
            const email = error.email
            fetchSignInMethodsForEmail($firebaseAuth, email).then(
              function (methods) {
                if (methods[0] === "password") {
                  alert(
                    "Google account's email already exist in another provider. Please signin using your password",
                  )
                }
              },
            )
          }
        },
      )
    } catch (error) {
      alert(error)
    }
  }

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider()
    const { $firebaseAuth } = useNuxtApp()
    const router = useRouter()
    // signInWithPopup($firebaseAuth, provider)
    //   .then((result) => {
    //     const credential = FacebookAuthProvider.credentialFromResult(result)
    //     const token = credential?.idToken
    //     router.push('/')
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
    await signInWithRedirect($firebaseAuth, provider)
  }

  return {
    register,
    login,
    logout,
    signInWithGoogle,
    signInWithFacebook,
  }
}
