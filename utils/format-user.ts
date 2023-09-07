import { DecodedIdToken } from "firebase-admin/auth"
import { User as FirebaseUser } from "firebase/auth"
import * as types from "~~/types"

type TypeUser = types.User

export const formatUser = async <TypeUser>(
  user: FirebaseUser | DecodedIdToken
) => {
  const { data } = await useFetch("/api/signin", {
    query: { userId: user.uid },
  })

  return <TypeUser>{
    uid: user.uid,
    email: user.email,
    name: data.value?.name,
    contact_details: data.value?.contact_details,
  }
}
