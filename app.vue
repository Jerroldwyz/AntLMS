<template>
  <div>
    <NuxtLayout v-if="user">
      <NuxtPage />
    </NuxtLayout>

    <AuthLogin v-else />
  </div>

</template>

<script setup>
const { useAuthUser } = useAuth()
const user = useAuthUser()
</script>
