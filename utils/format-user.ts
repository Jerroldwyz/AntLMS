import { DecodedIdToken } from "firebase-admin/auth"
import { User as FirebaseUser } from "firebase/auth"
import * as types from "~~/types"

type TypeUser = types.User;

export const formatUser = <TypeUser>(user: FirebaseUser | DecodedIdToken) => {
  return <TypeUser>{ uid: user.uid, email: user.email || "" }
}
