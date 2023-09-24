import { DecodedIdToken } from "firebase-admin/auth"
import { User as FirebaseUser } from "firebase/auth"

export const formatUser = async <TypeUser>(
  user: FirebaseUser | DecodedIdToken,
) => {
  const { data } = await useFetch("/api/signin", {
    method: "post",
    body: {
      uid: user.uid,
      email: user.email,
    },
  })

  return <TypeUser>{
    uid: user.uid,
    email: user.email,
    name: data.value?.name,
    contact_details: data.value?.contact_details,
  }
}
