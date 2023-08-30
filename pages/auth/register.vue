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
        <h2 class="font-weight-bold mt-4 text--darken-2">Sign up</h2>
        <h6 class="text-subtitle-1 text-grey-darken-1">
          Already have an account?
          <NuxtLink
            to="/auth/login"
            class="text-primary text-decoration-none"
            >Sign in</NuxtLink
          >
        </h6>
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="signUp"
        >
          <v-row>
            <v-col>
              <v-text-field
                v-model="firstName"
                :rules="nameRules"
                label="First name"
                class="mt-4"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="lastName"
                :rules="nameRules"
                label="Last name"
                class="mt-4"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            class="mt-4"
            required
          ></v-text-field>
          <v-text-field
            v-model="phoneNumber"
            label="Phone number"
            class="mt-4"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            class="mt-4"
            required
          ></v-text-field>
          <v-text-field
            v-model="confirmedPassword"
            :rules="passwordValidation"
            label="Confirm password"
            type="password"
            class="mt-4"
          ></v-text-field>
          <v-btn
            color="primary"
            block
            class="py-6"
            type="submit"
            :disabled="disabled"
            >{{ disabled ? "Creating new user" : "Sign Up" }}</v-btn
          >
        </v-form>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})
import { createUserWithEmailAndPassword } from "firebase/auth"

const { $firebaseAuth } = useNuxtApp()
const router = useRouter()
const userStore = useUserStore()

const email = ref("")
const password = ref("")
const confirmedPassword = ref("")
const valid = ref(false)
const disabled = ref(false)
const firstName = ref("")
const lastName = ref("")
const phoneNumber = ref()

const nameRules = ref([(v: string) => !!v || "Name is required"])

const emailRules = ref([
  (v: string) => !!v || "E-mail is required",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
])

const passwordRules = ref([
  (v: string) => !!v || "Password is required",
  (v: string) =>
    (v && v.length >= 6) || "Password must be more than 6 characters",
])

const passwordValidation = ref([
  (v: string) => !!v || "Confirmed password is required",
  () => password.value === confirmedPassword.value || "Password must match",
])

const signUp = async () => {
  disabled.value = true
  try {
    // new firebase user
    const firebaseUser = (
      await createUserWithEmailAndPassword(
        $firebaseAuth,
        email.value,
        password.value
      )
    ).user
    const userProps = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      name: `${firstName.value} ${lastName.value}`,
      contact_details: {
        phone_number: phoneNumber.value,
      },
    }
    await userStore.register(userProps)
    router.push("/auth/login")
  } catch (error) {
    alert(error)
  }
}
</script>

<style scoped></style>
