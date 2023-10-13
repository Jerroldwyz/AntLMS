import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { useUserStore } from "~/stores/useUserStore"
import { User } from "~/types"

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const firebaseConfig = config.public
  const app = initializeApp(firebaseConfig.firebase)
  const auth = getAuth(app)

  const userStore = useUserStore()

  nuxtApp.hooks.hook("app:beforeMount", () => {
    auth.onIdTokenChanged(async (user) => {
      if (user) {
        // if (!user.emailVerified) {
        //   navigateTo("/auth/verify")
        // } else {
        //   userStore.isAdmin = false
        //   user.getIdTokenResult(true).then(async (idTokenResult) => {
        //     const token = idTokenResult.token
        //     const signedInUser = (await formatUser(user)) as unknown as User
        //     if (signedInUser) {
        //       if (idTokenResult.claims.admin || signedInUser!.is_admin) {
        //         userStore.isAdmin = true
        //       }
        //       await setServerSession(token)
        //     }
        //   })
        // }
        if (!user.emailVerified) {
          navigateTo("/auth/verify")
        }
        const token = await user.getIdToken(true)
        await setServerSession(token)
        userStore.setUser(await formatUser(user))
      } else {
        await setServerSession(null)
        userStore.setUser(null)
      }
    })
  })

  return {
    provide: {
      firebaseApp: app,
      firebaseAuth: auth,
    },
  }
})

export const setServerSession = async (token: string | null) => {
  await useFetch("/api/auth/session", {
    method: "post",
    body: {
      token,
    },
    retry: 0,
  })
}
