<script setup>
const quiz = await $fetch("/api/quiz/702097645", {
  method: "get",
})

const answers = ref({})

const score = ref("")

const handleSubmit = async () => {
  const choices = quiz.questions.map((question) => {
    return answers.value[question.id]
  })

  const result = await $fetch("/api/quiz/702097645/evaluate", {
    method: "post",
    body: {
      result: choices,
    },
  })

  score.value = `${result.correctAnswer}/${result.totalQuestion}`
}
</script>

<template>
  <h1>{{ quiz.title }}</h1>
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
