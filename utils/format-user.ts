import { DecodedIdToken } from "firebase-admin/auth"
import { User as FirebaseUser } from "firebase/auth"

export const formatUser = async <TypeUser>(
  user: FirebaseUser | DecodedIdToken,
) => {
  const { data } = await useFetch("/api/auth/signin", {
    method: "POST",
    body: {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
    },
  })

  return <TypeUser>{
    is_admin: data.value?.is_admin,
    uid: user.uid,
    email: user.email,
    name: data.value?.name,
    thumbnail: data.value?.thumbnail,
    contact_details: data.value?.contact_details,
  }
}
