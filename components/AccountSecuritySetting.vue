<template>
  <v-container>
    <h4>Password</h4>
    <p>
      <i class="text-caption"
        >An email will be sent to you to reset password.</i
      >
    </p>
    <v-btn
      variant="outlined"
      color="red"
      @click="handlePasswordReset"
      >Send password reset email</v-btn
    >
    <h4 class="pt-10">Link other accounts</h4>
  </v-container>
</template>

<script setup lang="ts">
import { sendPasswordResetEmail } from "firebase/auth"

const handlePasswordReset = () => {
  const { $firebaseAuth } = useNuxtApp()
  const currentUser = $firebaseAuth.currentUser
  if (currentUser?.email) {
    sendPasswordResetEmail($firebaseAuth, currentUser?.email, {
      url: "http://localhost:3000/auth/login",
    })
      .then((result) => {
        alert(
          "We have sent you a password reset link to your email. Pleas check your email inbox or spam folder",
        )
      })
      .catch((error) => {
        throw new Error(
          "An error has occurred while trying to send you a password reset link. Please try again.",
          error,
        )
      })
  }
}
</script>
