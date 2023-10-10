<template>
  <Quiz
    :id="route.params.quiz_id"
    :user-id="userStore.user?.uid"
    :enrollment-id="quizStore.enrollmentId"
  ></Quiz>
</template>

<script setup lang="ts">
const quizStore = useQuizStore()
const userStore = useUserStore()
const route = useRoute()
</script>
