import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'

// sign up new users
export const createUser = async (email: string, password: string) => {
  const auth = getAuth()
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
  })

  return credentials
}

// sign in existing users
export const signInUser = async (email: string, password: string) => {
  const auth = getAuth()
  const credentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
  })

  return credentials
}

export const userObserver = async () => {
  const auth = getAuth()
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid
      // ...
    } else {
      // User is signed out
      // ...
    }
  })
}
