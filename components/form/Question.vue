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
        >
          <template #label>
            <v-card
              style="
                width: 100%;
                height: 80%;
                background-color: #ededed;
                border-bottom: 2px solid;
              "
              variant="tonal"
              @click="
                () => {
                  showEditor = true
                  activeChoice = index
                  choices[activeChoice].choiceText =
                    choices[activeChoice].choiceText
                }
              "
            >
              <div v-html="choice.choiceText"></div>
            </v-card>
            <v-btn @click="choices.splice(index, 1)">x</v-btn>
          </template>
        </v-radio>
      </v-radio-group>
      <v-card v-if="showEditor">
        <QuillEditor
          v-model:content="choices[activeChoice].choiceText"
          theme="snow"
          content-type="html"
        />
        <v-btn
          variant="elevated"
          @click="showEditor = false"
          >Close Editor</v-btn
        >
      </v-card>
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
import { QuillEditor } from "@vueup/vue-quill"
import "@vueup/vue-quill/dist/vue-quill.snow.css"
/*
Form component refs
*/
const correctAns = ref(0)
const questionText = ref("")
const explanation = ref("")
const choices = ref([])
const activeChoice = ref(0)

// props
const props = defineProps(["id", "quizId"])

// popups and dialog boxes
const choiceAlert = ref(false)
const dialog = ref(false)
const showEditor = ref(false)

// for updating and deleting

const pageTitle = ref(props.id ? "Update Question" : "Create Question")

if (props.id !== undefined) {
  const questionData = await $fetch(`/api/question/${props.id}`, {
    method: "get",
  })

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
  for (let i = 0; i < choices.value.length; i++) {
    if (i === correctAns.value) {
      choices.value[i].isCorrect = true
    } else {
      choices.value[i].isCorrect = false
    }
  }
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
    await $fetch(`/api/question/${props.id ?? ""}`, {
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
