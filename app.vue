<template>
  <div>
    <NuxtLayout v-if="user">
      <NuxtPage />
    </NuxtLayout>

    <AuthLogin v-else />
  </div>
</template>

<script setup>
const { registerUser } = useFirebase()
const creds = reactive({
  email: 'abc@gmail.com',
  password: '12345678',
})

const result = await registerUser(creds.email, creds.password)
console.log(result)
</script>
