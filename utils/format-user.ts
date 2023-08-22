import { DecodedIdToken } from 'firebase-admin/auth'
import { User } from 'firebase/auth'

export const formatUser = (user: User | DecodedIdToken) => {
  return { uid: user.uid, email: user.email || '' }
}
