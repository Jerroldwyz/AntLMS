import { error } from 'console'
import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'

// create user using email and password
export const createUser = async (email: string, password: string) => {
  return new Promise<UserCredential>((resolve, reject) => {
    const $auth = getAuth()
    createUserWithEmailAndPassword($auth, email, password)
      .then((userCredentials) => {
        resolve(userCredentials)
      })
      .catch((error) => reject(error))
  })
}

// sign in user using email and password
export const signInUser = async (email: string, password: string) => {
  return new Promise<UserCredential>((resolve, reject) => {
    const $auth = getAuth()
    signInWithEmailAndPassword($auth, email, password)
      .then((userCredentials) => {
        resolve(userCredentials)
      })
      .catch((error) => reject(error))
  })
}

// user state listener
export const initUser = async () => {
  const $auth = getAuth()
  const firebaseUser = useFirebaseUser()
  firebaseUser.value = $auth.currentUser
  onAuthStateChanged($auth, (user) => {
    if (user) {
      // user is signed in
      console.log('Auth changed: user signed in')
    } else {
      // user is signed out
      console.log('Auth changed: user signed out')
    }

    firebaseUser.value = user
  })
}

export const signOutUser = async () => {
  const $auth = getAuth()
  const result = await $auth.signOut()
  return result
}
