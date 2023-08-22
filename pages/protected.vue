<template>
    <div>
        This page is protected
        <NuxtLink to="/">Home page</NuxtLink>
    </div>
    <v-btn @click="signOut">Sign Out</v-btn>
</template>

<script setup lang="ts">
const { $firebaseAuth } = useNuxtApp()
const { signOutUser } = useFirebase($firebaseAuth)
const router = useRouter()

const signOut = async () => {
    try {
        await signOutUser()
        router.push('/')
    } catch (error) {
        alert(error)
    }
}
</script>

<style lang="scss" scoped></style>