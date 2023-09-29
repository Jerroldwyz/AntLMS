<template>
  <v-container>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-card-title class="text-h5">{{ pageTitle }}</v-card-title>
      <v-text-field
        v-model="questionText"
        label="Question Text"
        variant="outlined"
        required
      />
      <v-text-field
        v-model="explanation"
        label="Explanation"
        variant="outlined"
        required
      />
      <h4>Choices</h4>
      <v-radio-group v-model="correctAns">
        <v-radio
          v-for="(choice, index) in choices"
          :key="index"
          :value="index"
        >
          <template #label>
            <v-text-field
              v-model="choice.choiceText"
              variant="underlined"
              type="text"
            />
          </template>
        </v-radio>
      </v-radio-group>
      <v-btn
        style="size: 8px"
        variant="elevated"
        @click="addChoice"
        >Add Choices</v-btn
      >
      <v-btn
        style="align-self: center"
        variant="elevated"
        @click="handleSubmit"
        >Add Question</v-btn
      >
    </v-form>
  </v-container>
</template>

<script setup>
const props = defineProps(["id"])

const choices = ref([])
const pageTitle = ref("Create Question")
const correctAns = ref(0)
const questionText = ref("")
const explanation = ref("")

if (props.id !== undefined) {
  const questionData = await $fetch(`/api/question/${props.id}`, {
    method: "get",
  })

  pageTitle.value = "Update Question"

  choices.value = questionData.choices
  questionText.value = questionData.questionText
  explanation.value = questionData.explanation
}

const addChoice = () => {
  if (choices.value.length < 4) {
    choices.value.push({
      choiceText: "",
      isCorrect: false,
    })
  }
}

const handleSubmit = async () => {
  choices.value[correctAns.value].isCorrect = true
  const question = {
    questionText: questionText.value,
    explanation: explanation.value,
    choices: choices.value,
  }
  const questionData = await useFetch(`/api/question/`, {
    method: "post",
    body: {
      ...question,
    },
  })
}
</script>

<style scoped>
.v-btn {
  background-color: lightcoral;
  color: white;
  display: block;
  margin: 10px;
}
</style>
