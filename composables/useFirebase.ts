// firebase web jdk wrapper

import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Auth,
} from "firebase/auth"

export default (firebaseAuth: Auth) => {
  const createUser = <User>(email: string, password: string) => {
    return new Promise<User>((resolve, reject) => {
      createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredentials) => {
          resolve(formatUser(userCredentials.user))
        })
        .catch((error) => reject(error))
    })
  }

  const signInUser = (email: string, password: string) => {
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
