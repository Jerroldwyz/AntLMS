<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
const firebaseUser = useFirebaseUser()
console.log(firebaseUser)
const router = useRouter()
if (!firebaseUser?.value) {
  // router.push('/login')
}
</script>

<template>
  <div>
    This is home page
  </div>
</template>

