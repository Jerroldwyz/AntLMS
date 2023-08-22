import { error } from 'console'
import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  Auth,
} from 'firebase/auth'

export default (firebaseAuth: Auth) => {
  const createUser = async (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredentials) => {
          resolve(userCredentials)
        })
        .catch((error) => reject(error))
    })
  }

  const signInUser = async (email: string, password: string) => {
    return new Promise<UserCredential>((resolve, reject) => {
      signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredentials) => {
          resolve(userCredentials)
        })
        .catch((error) => reject(error))
    })
  }

  const signOutUser = async () => {
    const result = await firebaseAuth.signOut()
    return result
  }

  return {
    createUser,
    signInUser,
    signOutUser,
  }
}
