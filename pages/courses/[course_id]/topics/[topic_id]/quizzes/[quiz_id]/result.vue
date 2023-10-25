<template>
  <div class="d-flex flex-column justify-center">
    <v-btn
      color="primary"
      variant="tonal"
      size="x-large"
      prepend-icon="mdi-arrow-left"
      @click="onClick"
      >Back to quiz</v-btn
    >
    <v-card class="w-50 ma-auto px-10 py-5">
      <v-card-title class="text-h5">Result</v-card-title>
      <div>
        <span
          v-if="quizPassed"
          class="text-body-1"
          color="success"
          >Congratulations! You have passed the quiz</span
        >
        <p
          v-else
          class="text-body-1 text-red"
        >
          You didn't passed the quiz
        </p>
      </div>
      <p>
        Your score:
        <span>{{ data.correctAnswer }}</span
        >/<span>{{ data.totalQuestions }}</span>
      </p>
    </v-card>
    <QuizResultBox
      v-for="(question, index) in data.result"
      :id="question.questionId"
      :key="index"
      :is-correct="question.isCorrect"
      :key-index="index + 1"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const onClick = () => {
  router.back()
}
const quizStore = useQuizStore()
const data = await quizStore.evaluateQuiz(route.params.quiz_id as string)
const quizPassed = data.correctAnswer >= data.threshold
if (quizPassed) {
  const courseProgressStore = useCourseProgressStore()
  courseProgressStore.updateQuizProgress(route.params.course_id)
}
</script>

<style scoped></style>
