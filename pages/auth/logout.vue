<template>
    <div>
        <h1>You have successfully logout</h1>
        <NuxtLink to="/auth/login">Login</NuxtLink>
    </div>
</template>

<script setup>
definePageMeta({
    layout: false
})
const { $firebaseAuth } = useNuxtApp()
const { signOutUser } = useFirebase($firebaseAuth)
await signOutUser()
</script>

<style lang="scss" scoped></style>