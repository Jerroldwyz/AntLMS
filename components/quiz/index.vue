<script setup>
const props = defineProps(["id", "enrollmentId", "userId"])

const quiz = await $fetch(`/api/quiz/${props.id}`, {
  method: "get",
})
const dialogBox = ref(false)
const answers = ref({})
const result = ref({})
const invalid = ref(false)

const handleSubmit = async () => {
  const choices = quiz.questions.map((question) => {
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

<template>
  <h1>{{ quiz.title }}</h1>

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
    v-for="(question, index) in quiz.questions"
    :id="question.id"
    :key="index"
    v-model:answer="answers[question.id]"
    :text="question.questionText"
    :explanation="question.explanation"
    :choices="question.choices"
  />

  <v-btn @click="handleSubmit">Submit Quiz</v-btn>
</template>

<style scoped>
button {
  background-color: lightcoral;
  color: white;
}
</style>
