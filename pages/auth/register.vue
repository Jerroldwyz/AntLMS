<template>
  <v-container
    class="d-flex fill-height justify-center align-center"
    tag="section"
  >
    <v-card
      width="35%"
      elevation="10"
      class="pa-7 pa-sm-10"
    >
      <h2 class="font-weight-bold mt-4">Sign up</h2>
      <div v-if="isRegistered">
        We have sent you a verification to your email, please check the email
        <NuxtLink to="/auth/login"></NuxtLink>
      </div>
      <div v-else>
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
import { sendEmailVerification, sendSignInLinkToEmail } from "firebase/auth"
definePageMeta({
  layout: false,
  middleware: "guest",
})

const { register } = useAuth()

const email = ref("")
const password = ref("")
const confirmedPassword = ref("")
const valid = ref(false)
const disabled = ref(false)
const firstName = ref("")
const lastName = ref("")

const emailVerified = ref(false)
const isRegistered = ref(false)

const nameRules = [(v: string) => !!v || "Name is required"]

const emailRules = [
  (v: string) => !!v || "E-mail is required",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]

const passwordRules = [
  (v: string) => !!v || "Password is required",
  (v: string) =>
    (v && v.length >= 6) || "Password must be more than 6 characters",
]

const passwordValidation = [
  (v: string) => !!v || "Confirmed password is required",
  () => password.value === confirmedPassword.value || "Password must match",
]

const signUp = () => {
  disabled.value = true
  try {
    const userProps = {
      email: email.value,
      name: `${firstName.value} ${lastName.value}`,
      password: password.value,
      contact_details: {},
    }
    register(userProps).then((user) => {
      const actionCodeSettings = {
        url: "http://localhost:3000/auth/login",
      }
      sendEmailVerification(user, actionCodeSettings)
    })
  } catch (error) {
    alert(error)
  }
}
</script>

<style scoped></style>
