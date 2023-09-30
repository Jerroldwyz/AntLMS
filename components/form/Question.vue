<template>
  <v-container>
    <v-alert
      v-model="choiceAlert"
      border="start"
      variant="tonal"
      closable
      close-label="Close Alert"
      color="red"
      title="Error"
    >
      You need to have more than 1 choices
    </v-alert>
    <v-form ref="form">
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
          style="width: 45%"
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
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card>
        <v-card-text> The Quiz has been successfully created </v-card-text>
        <v-btn
          color="primary"
          block
          @click="dialog = false"
          >Close Dialog</v-btn
        >
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
const props = defineProps(["id", "quizId"])
const choiceAlert = ref(false)
const dialog = ref(false)

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
  console.log(editor.getContent())
}

const handleSubmit = async () => {
  choices.value[correctAns.value].isCorrect = true
  const question = {
    quizId: props.quizId,
    questionText: questionText.value,
    explanation: explanation.value,
    choices: choices.value,
  }

  if (choices.value.length < 2) {
    choiceAlert.value = true
    return
  }

  try {
    await $fetch(`/api/question`, {
      method: props.id ? "put" : "post",
      body: {
        ...question,
      },
    })
    dialog.value = true
  } catch (e) {
    console.log(e)
  }
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
