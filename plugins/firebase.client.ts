import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { useUserStore } from "~/stores/useUserStore"

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const firebaseConfig = config.public
  const app = initializeApp(firebaseConfig.firebase)
  const auth = getAuth(app)

  const userStore = useUserStore()

  nuxtApp.hooks.hook("app:mounted", () => {
    // auth.onIdTokenChanged(async (user) => {
    //   if (user) {
    //     console.log("User signed in")
    //     const token = await user.getIdToken()
    //     setServerSession(token)
    //     authStore.user = await formatUser(user)
    //     user.getIdTokenResult().then((idTokenResult) => {
    //       if (idTokenResult.claims.admin) {
    //         authStore.isAdmin = true
    //         navigateTo("/admin")
    //       } else {
    //         authStore.isAdmin = false
    //         navigateTo("/")
    //       }
    //     })
    //   } else {
    //     console.log("User signed out")
    //     setServerSession("")
    //     authStore.user = null
    //   }
    // })
  })

  auth.onIdTokenChanged(async (user) => {
    if (user) {
      const token = await user.getIdToken(true)
      await setServerSession(token)
      userStore.setUser(await formatUser(user))
    } else {
      await setServerSession(null)
      userStore.setUser(null)
    }
  })

  return {
    provide: {
      firebaseApp: app,
      firebaseAuth: auth,
    },
  }
})

const setServerSession = async (token: string | null) => {
  await useAsyncData(
    async () =>
      await $fetch("/api/session", {
        method: "post",
        body: {
          token,
        },
        retry: 0,
      }),
  )
}
