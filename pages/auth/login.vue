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
            <div class="d-flex d-row align-center mb-3">
              <v-divider
                :thickness="2"
                class="border-opacity-25"
              ></v-divider>
              <p class="text-body-1 mx-3">or</p>
              <v-divider
                :thickness="2"
                class="border-opacity-25"
              ></v-divider>
            </div>
            <v-btn
              class="mb-4"
              block
              @click="signInWithProvider(AuthStrategy.Google)"
            >
              <v-icon
                start
                icon="mdi-google"
              ></v-icon>
              Continue with Google
            </v-btn>
            <v-btn
              class="mb-4"
              block
              @click="signInWithProvider(AuthStrategy.Facebook)"
            >
              <v-icon
                start
                icon="mdi-facebook"
              ></v-icon>
              Continue with Facebook
            </v-btn>
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
import { getRedirectResult } from "firebase/auth"
import {
  AuthStrategy,
  ICredentialsPayload,
  loginWithEmailAndPassword,
  popupLoginWithOAuthProvider,
  resolveCredentials,
} from "~/services/firebase"

definePageMeta({
  layout: false,
  middleware: "guest",
})
const valid = ref(true)
const disabled = ref(false)
const checkbox = ref(false)
const router = useRouter()
const email = ref("")
const password = ref("")
const token = useFirebaseToken()

const signIn = async () => {
  const credentialsPayload: ICredentialsPayload = {
    strategy: AuthStrategy.Email,
    credentials: {
      email: email.value,
      password: password.value,
    },
  }
  disabled.value = true
  try {
    const user = await loginWithEmailAndPassword(
      credentialsPayload.credentials!,
    )
    if (user) await resolveCredentials(user)
  } catch (error) {
    alert(error)
  } finally {
    router.push("/")
  }
  disabled.value = false
}

const signInWithProvider = async (strategy: AuthStrategy) => {
  try {
    const userCredentials = await popupLoginWithOAuthProvider(strategy)
    if (userCredentials) {
      await resolveCredentials(userCredentials)
    }
  } catch (error) {
    alert(error)
  } finally {
    router.push("/")
  }
}

// OAuth redirect not working
onMounted(async () => {
  // const { $firebaseAuth } = useNuxtApp()
  // const result = await getRedirectResult($firebaseAuth)
  // console.log(result)
})
</script>

<style scoped></style>
