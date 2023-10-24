import { UserRecord } from "firebase-admin/auth"
import { User as FirebaseUser } from "firebase/auth"

export const formatUser = async <TypeUser>(
  user: FirebaseUser | UserRecord,
  isAdmin: boolean = false,
) => {
  const data = await $fetch(`/api/auth/me/`, {
    method: "POST",
    body: {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      thumbnail: null,
      contact_details: {},
      isAdmin,
    },
  })

  return <TypeUser>{
    is_admin: data.is_admin,
    uid: user.uid,
    email: user.email,
    name: data.name,
    thumbnail: data.thumbnail,
    contact_details: data.contact_details,
  }
}
