import { DecodedIdToken } from 'firebase-admin/auth'
import { User } from 'firebase/auth'
import { IUser } from '~~/types'

export const formatUser = <IUser>(user: User | DecodedIdToken) => {
  return <IUser>{ uid: user.uid, email: user.email || '' }
}
