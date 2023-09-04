<template>
  <div>
    <h1>You have successfully logout</h1>
    <NuxtLink to="/auth/login">Login</NuxtLink>
  </div>
</template>

<script setup>
import { signOut } from "firebase/auth"

definePageMeta({
  layout: false,
})
const { $firebaseAuth } = useNuxtApp()
await signOut($firebaseAuth)
</script>

<style lang="scss" scoped></style>
