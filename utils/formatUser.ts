import { DecodedIdToken } from 'firebase-admin/auth'
import { User } from 'firebase/auth'

export default (user: User | DecodedIdToken) => {
  return { uid: user.uid, email: user.email || '' }
}
