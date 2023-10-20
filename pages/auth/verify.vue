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
      <p class="text-h6">
        Email {{ $firebaseAuth.currentUser?.email }} Unverified
      </p>
      <v-btn @click="sendEmail"> Send verification link to my email </v-btn>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { sendEmailVerification } from "firebase/auth"

definePageMeta({
  layout: false,
  middleware: "guest",
})

const { $firebaseAuth } = useNuxtApp()

const sendEmail = () => {
  try {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: "http://localhost:3000/auth/login",
      // This must be true.
      handleCodeInApp: true,
    }
    sendEmailVerification($firebaseAuth.currentUser!, actionCodeSettings).then(
      () => {
        alert(
          "Successfully send email verification link! Please check your inbox or spam folder",
        )
      },
    )
  } catch (error) {
    alert(error)
  }
}
</script>
