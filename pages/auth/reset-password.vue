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
      <p class="text-h6">Reset password</p>
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="sendEmail"
      >
        <FormEmailInput v-model="email" />
        <v-btn
          class="mb-4"
          color="primary"
          block
          type="submit"
        >
          Send password reset to my email
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth"

definePageMeta({
  layout: false,
})

const { $firebaseAuth } = useNuxtApp()
const valid = ref(true)
const email = ref("")

const sendEmail = () => {
  try {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: "http://localhost:3000/auth/login",
      // This must be true.
      handleCodeInApp: true,
    }
    sendPasswordResetEmail($firebaseAuth, email.value, actionCodeSettings)
  } catch (error) {
    alert(error)
  } finally {
    alert(
      "We have sent you a password reset link to your email! Please check inbox or spam folder",
    )
  }
}
</script>
