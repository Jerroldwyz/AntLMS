<script setup>
const props = defineProps(["id"])

const quiz = await $fetch(`/api/quiz/${props.id}`, {
  method: "get",
})

const answers = ref({})

const score = ref("")

const handleSubmit = async () => {
  const choices = quiz.questions.map((question) => {
    return answers.value[question.id]
  })

  try {
    const result = await $fetch(`/api/quiz/${props.id}/evaluate`, {
      method: "post",
      body: {
        result: choices,
      },
    })

    score.value = `${result.correctAnswer}/${result.totalQuestion}`
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <h1>{{ quiz.title }}</h1>
  <!-- <v-alert type="success" density="compact" title="Quiz Result" rounded="0" closable text="Your Quiz Score is: " +
    score.value /> -->
  <v-alert
    v-show="score"
    title="Quiz Result"
    rounded="0"
    closable
    text="Your Score is:"
    >{{ score }}</v-alert
  >
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

  {{ score }}
</template>

<style scoped>
button {
  background-color: lightcoral;
  color: white;
}
</style>
