<template>
  <v-container
    class="d-flex fill-height justify-center align-center"
    tag="section"
  >
    <v-card
      width="35%"
      elevation="10"
    >
      <div class="pa-7 pa-sm-10">
        <h2 class="font-weight-bold mt-4">Sign in</h2>
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="signIn"
        >
          <FormEmailInput v-model="email" />
          <FormPasswordInput v-model="password" />

          <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
            <v-checkbox
              v-model="checkbox"
              :rules="[(v: any) => !!v || 'You must agree to continue!']"
              label="Remember me?"
              required
              hide-details
            ></v-checkbox>
            <div class="ml-auto">
              <NuxtLink
                to="/auth/reset-password"
                class="text-primary text-decoration-none"
                >Forgot password?</NuxtLink
              >
            </div>
          </div>
          <div>
            <v-btn
              class="mb-4"
              color="primary"
              block
              type="submit"
              :disabled="disabled"
              >{{ disabled ? "Please wait" : "Sign In" }}</v-btn
            >
            <v-btn
              class="mb-4"
              block
              @click="googleSignIn"
            >
              <v-icon
                start
                icon="mdi-google"
              ></v-icon>
              Continue with Google
            </v-btn>
            <!-- <v-btn
              class="mb-4"
              block
              @click="facebookSignIn"
            >
              <v-icon
                start
                icon="mdi-facebook"
              ></v-icon>
              Continue with Facebook
            </v-btn> -->
          </div>
        </v-form>
        <h6 class="text-subtitle-1 text-grey-darken-1">
          Don't have an account?
          <NuxtLink
            to="/auth/register"
            class="text-primary text-decoration-none"
            >Sign up</NuxtLink
          >
        </h6>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const { login, signInWithGoogle, signInWithFacebook } = useAuth()
const valid = ref(true)
const disabled = ref(false)
const checkbox = ref(false)
const router = useRouter()
const email = ref("")
const password = ref("")

const signIn = async () => {
  disabled.value = true
  try {
    const result = await login(email.value, password.value)

    if (result) {
      const userStore = useUserStore()
      userStore.$subscribe((mutate, state) => {
        router.push("/")
      })
    }
  } catch (error) {
    alert(error)
  }
  disabled.value = false
}

const googleSignIn = async () => {
  const result = await signInWithGoogle()
  if (result) {
    router.push("/")
  }
}

const facebookSignIn = () => {
  signInWithFacebook().then(() => {
    router.push("/")
  })
}
</script>

<style scoped></style>
