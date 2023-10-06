import { getAuth, Auth } from "firebase-admin/auth"
import { useFirebaseAdmin } from "./useFirebaseAdmin.server"

let firebaseServerAuth: Auth | null = null

export const useServerAuth = (): Auth => {
  if (firebaseServerAuth) return firebaseServerAuth

  const app = useFirebaseAdmin()!
  firebaseServerAuth = getAuth(app)

  return firebaseServerAuth
}
