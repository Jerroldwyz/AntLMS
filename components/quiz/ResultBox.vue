<script setup lang="ts">
const props = defineProps<{
  keyIndex: number
  id: number
  isCorrect: boolean
}>()

interface Choice {
  id: number
  choiceText: string
}

interface Question {
  questionText: string
  explanation: string
  choices: Choice[]
}

const question = await $fetch<Question>(`/api/question/${props.id}`, {
  method: "GET",
})
</script>

<template>
  <div class="ma-7">
    <p class="text-body-1 font-weight-bold">
      Question {{ props.keyIndex }}
      <span
        v-if="props.isCorrect"
        class="text-green"
        >Correct!</span
      >
      <span
        v-else
        class="text-red"
        >Incorrect!</span
      >
    </p>
    <v-card
      class="elevation-10"
      variant="elevated"
      color="surface"
    >
      <v-card-title>{{ question.questionText }}</v-card-title>
      <v-card-text>
        <div class="text-body-1 py-3">
          <span class="font-weight-bold">Explain:</span>
          {{ question.explanation }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.v-card-title {
  color: aliceblue;
  background-color: #3700b3;
}
</style>
