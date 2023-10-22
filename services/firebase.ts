import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { setServerSession } from "~/plugins/firebase.client"

export enum AuthStrategy {
  Email,
  Google,
  Facebook,
}

export interface ICredentialsPayload {
  credentials?: {
    email: string
    password: string
  } | null
  strategy: AuthStrategy
}

export async function resolveCredentials(userCredential: UserCredential) {
  try {
    const token = await userCredential?.user.getIdToken()
    await setServerSession(token!)
  } catch (error) {
    alert("Unsuccessfully creating session")
  }
}

export async function logout(): Promise<void> {
  const { $firebaseAuth } = useNuxtApp()
  try {
    await signOut($firebaseAuth)
    await setServerSession(null)
  } catch (error) {
    alert("Failed to log you out")
  } finally {
    const router = useRouter()
    router.push("/auth/login")
  }
}

export async function loginWithEmailAndPassword({
  ...credentials
}): Promise<UserCredential | null> {
  const { $firebaseAuth } = useNuxtApp()
  return await signInWithEmailAndPassword(
    $firebaseAuth,
    credentials.email,
    credentials.password,
  )
}

export async function loginWithOAuthProvider(authStrategy: AuthStrategy) {
  const { $firebaseAuth } = useNuxtApp()
  let provider: GoogleAuthProvider | FacebookAuthProvider
  switch (authStrategy) {
    case AuthStrategy.Google:
      provider = new GoogleAuthProvider()
      break
    default:
      provider = new FacebookAuthProvider()
      break
  }

  await signInWithRedirect($firebaseAuth, provider)
}

export async function popupLoginWithOAuthProvider(authStrategy: AuthStrategy) {
  const { $firebaseAuth } = useNuxtApp()
  let provider: GoogleAuthProvider | FacebookAuthProvider
  switch (authStrategy) {
    case AuthStrategy.Google:
      provider = new GoogleAuthProvider()
      break
    default:
      provider = new FacebookAuthProvider()
      break
  }

  return await signInWithPopup($firebaseAuth, provider)
}
