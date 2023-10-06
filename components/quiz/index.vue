<template>
  <div>
    <v-progress-linear
      v-if="isLoading"
      color="primary"
      indeterminate
      :height="12"
    ></v-progress-linear>
    <div v-else>
      <div class="text-h2 mb-6">{{ quiz.value.title }}</div>
      <v-divider
        :thickness="7"
        class="border-opacity-100"
      ></v-divider>

      <v-dialog
        v-model="invalid"
        width="auto"
      >
        <v-card style="padding: 50px; border-radius: 20px">
          All Questions need to be answered
          <v-btn @click="invalid = false">Close</v-btn>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="dialogBox"
        width="auto"
      >
        <v-card style="padding: 50px; border-radius: 20px">
          <v-card-title
            class="text-h3 text-center"
            style="display: block"
            >Quiz Results</v-card-title
          >
          <v-card-text
            v-if="result.correctAnswer >= result.threshold"
            class="text-green text-bold"
          >
            Nice job, you passed!
            <v-icon start>mdi-check</v-icon>
            <v-chip
              class="mx-2"
              style="display: block; margin-top: 10%"
              >YOUR SCORE: {{ result.correctAnswer }}</v-chip
            >
            <v-chip
              class="mx-2"
              style="display: block; margin-top: 10%"
              >TOTAL QUESTIONS: {{ result.totalQuestion }}</v-chip
            >
          </v-card-text>
          <v-card-text
            v-else
            class="text-red text-bold"
          >
            You have failed
            <v-icon start>mdi-skull-scan</v-icon>
            <v-chip
              class="mx-2"
              style="display: block; margin-top: 10%"
              >YOUR SCORE: {{ result.correctAnswer }}</v-chip
            >
            <v-chip
              class="mx-2"
              style="display: block; margin-top: 10%"
              >TOTAL QUESTIONS: {{ result.totalQuestion }}</v-chip
            >
          </v-card-text>
          <v-btn @click="dialogBox = false">Close</v-btn>
        </v-card>
      </v-dialog>

      <QuizQuestionBox
        v-for="(question, index) in quiz.value.questions"
        :id="question.id"
        :key="index"
        v-model:answer="answers[question.id]"
        :text="question.questionText"
        :explanation="question.explanation"
        :choices="question.choices"
      />

      <v-btn @click="handleSubmit">Submit Quiz</v-btn>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["id", "enrollmentId", "userId"])

const quiz = ref({
  title: "",
  questions: [],
})

const fetchData = async () => {
  const { data } = await useFetch(`/api/quiz/${props.id}`, {
    method: "GET",
  })

  return data
}

onMounted(async () => {
  isLoading.value = true
  try {
    quiz.value = await fetchData()
  } finally {
    isLoading.value = false
  }
})

const isLoading = ref(true)
const dialogBox = ref(false)
const answers = ref({})
const result = ref({})
const invalid = ref(false)

const handleSubmit = async () => {
  const questions = quiz.value.questions
  console.log(questions)
  const choices = quiz.value.questions.map((question) => {
    return answers.value[question.id]
  })

  choices.forEach((choice) => {
    if (choice === undefined) {
      invalid.value = true
    }
  })

  if (invalid.value !== true) {
    try {
      result.value = await $fetch(`/api/quiz/${props.id}/evaluate`, {
        method: "post",
        body: {
          result: choices,
          enrollmentId: props.enrollmentId,
          userId: props.userId,
        },
      })
      dialogBox.value = true
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
<style scoped></style>
