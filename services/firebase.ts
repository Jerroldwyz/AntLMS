import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
  signOut,
} from "firebase/auth"

export enum AuthStrategy {
  Email = 0,
  Google,
  Facebook,
}

export interface ICredentialsPayload {
  credentials?: {} | null
  provider: AuthStrategy
}

export async function login(
  payload: ICredentialsPayload,
): Promise<UserCredential | null> {
  switch (payload.provider) {
    case AuthStrategy.Email:
      return await loginWithCredentials(payload.credentials!)
    case AuthStrategy.Google:
      return await loginWithGoogle()
    case AuthStrategy.Facebook:
      return await loginWithFacebook()
    default:
      return Promise.resolve(null)
  }
}

export async function logout(): Promise<void> {
  const { $firebaseAuth } = useNuxtApp()
  await signOut($firebaseAuth)
}

async function loginWithCredentials({
  ...credentials
}): Promise<UserCredential | null> {
  const { $firebaseAuth } = useNuxtApp()
  return await signInWithEmailAndPassword(
    $firebaseAuth,
    credentials.email,
    credentials.password,
  )
}

async function loginWithGoogle(): Promise<UserCredential | null> {
  const { $firebaseAuth } = useNuxtApp()
  const provider = new GoogleAuthProvider()
  return await signInWithPopup($firebaseAuth, provider)
}

async function loginWithFacebook(): Promise<UserCredential | null> {
  const { $firebaseAuth } = useNuxtApp()
  const provider = new FacebookAuthProvider()
  return await signInWithPopup($firebaseAuth, provider)
}
