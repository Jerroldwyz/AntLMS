import { DecodedIdToken } from "firebase-admin/auth"
import { User as FirebaseUser } from "firebase/auth"

export const formatUser = <TypeUser>(user: FirebaseUser | DecodedIdToken) => {
  return <TypeUser>{ uid: user.uid, email: user.email || "" }
}
