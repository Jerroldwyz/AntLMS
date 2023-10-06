<template>
  <Quiz
    :id="route.params.quiz_id"
    :user-id="userStore.user?.uid"
    :enrollment-id="658147177"
  ></Quiz>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const route = useRoute()
</script>
