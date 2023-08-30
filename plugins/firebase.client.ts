import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const firebaseConfig = config.public
  const app = initializeApp(firebaseConfig.firebase)
  const auth = getAuth(app)

  const user = useUser()

  auth.onAuthStateChanged(async (firebaseUser) => {
    if (firebaseUser) {
      console.log("user signed in")
    } else {
      console.log("user signed out")
      user.value = null
    }
  })

  return {
    provide: {
      firebaseApp: app,
      firebaseAuth: auth,
    },
  }
})

const setServerSession = (token: string) => {
  return $fetch("/api/session", {
    method: "POST",
    body: {
      token,
    },
  })
}
