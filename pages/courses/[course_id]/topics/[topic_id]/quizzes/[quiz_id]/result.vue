<template>
  <div>
    <div class="d-flex flex-row">
      <v-btn
        color="primary"
        variant="text"
        size="x-large"
        @click="onClick"
        >Back to quiz</v-btn
      >
      <p class="text-h3">Result for quiz</p>
    </div>
    <pre>
      {{ data }}
    </pre>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const onClick = () => {
  router.back()
}
const quizStore = useQuizStore()
const userStore = useUserStore()
const result = ref(quizStore.result)
const data = await $fetch(`/api/quiz/${route.params.quiz_id}/evaluate`, {
  method: "post",
  body: {
    result: result.value,
    enrollmentId: quizStore.enrollmentId,
    userId: userStore.user?.uid,
  },
})
</script>

<style scoped></style>
