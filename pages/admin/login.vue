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
        <h2 class="font-weight-bold mt-4 text--darken-2">Sign in as Admin</h2>
        <NuxtLink to="/auth/login">Sign in as user</NuxtLink>
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="signIn"
        >
          <FormEmailInput v-model:email="email" />

          <FormPasswordInput v-model:password="password" />

          <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
            <v-checkbox
              v-model="checkbox"
              :rules="[(v) => !!v || 'You must agree to continue!']"
              label="Remember me?"
              required
              hide-details
            ></v-checkbox>
            <div class="ml-auto">
              <a
                href="javascript:void(0)"
                class="text-primary text-decoration-none"
                >Forgot pwd?</a
              >
            </div>
          </div>
          <v-btn
            color="primary"
            block
            class="py-6"
            type="submit"
            :disabled="disabled"
            >{{ disabled ? "Please wait" : "Sign In" }}</v-btn
          >
        </v-form>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { signInWithEmailAndPassword } from "firebase/auth"

definePageMeta({
  layout: false,
})

const { $firebaseAuth } = useNuxtApp()
// TODO: Vars are unused
// const { signInUser } = useFirebase($firebaseAuth)
// const user = useUser()
// const token = useCookie("token")
const valid = ref(true)
const disabled = ref(false)
const checkbox = ref(false)
const router = useRouter()

const email = ref("")
const password = ref("")

const signIn = async () => {
  disabled.value = true
  try {
    await signInWithEmailAndPassword($firebaseAuth, email.value, password.value)
    router.push("/admin")
  } catch (error) {
    alert(error)
  }
  disabled.value = false
}
</script>

<style scoped></style>
