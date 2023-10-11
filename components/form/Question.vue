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
      <v-card>
        <v-card-subtitle>Question Text</v-card-subtitle>
        <QuillEditor
          v-model:content="questionText"
          theme="snow"
          content-type="html"
        />
      </v-card>
      <v-card>
        <v-card-subtitle>Explanation</v-card-subtitle>
        <QuillEditor
          v-model:content="explanation"
          theme="snow"
          content-type="html"
        />
      </v-card>
      <h4>Choices</h4>
      <v-text-field
        v-for="(choice, index) in choices"
        :key="index"
        v-model="choices[index].choiceText"
        variant="underlined"
        required
      >
        <template #prepend>
          <v-tooltip location="bottom">
            <template #activator="{ props }">
              <v-icon
                v-bind="props"
                @click="activeChoice = index"
                >{{
                  index === activeChoice
                    ? "mdi-checkbox-marked-circle-outline"
                    : "mdi-checkbox-blank-circle-outline"
                }}</v-icon
              >
            </template>
            Click to make it correct answer
          </v-tooltip>
        </template>

        <template #append>
          <v-tooltip location="bottom">
            <template #activator="{ props }">
              <v-icon
                v-bind="props"
                icon="mdi-close-box"
                color="red"
                @click="choices.splice(index, 1)"
              ></v-icon>
            </template>
            Delete Choice
          </v-tooltip>
        </template>
      </v-text-field>
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
        >{{ props.id ? "Update" : "Add" }} Question</v-btn
      >
    </v-form>
  </v-container>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card>
        <v-card-text>
          The Quiz has been successfully
          {{ props.id ? "updated" : "created" }}</v-card-text
        >
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
const emit = defineEmits(["changed"])

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
    const questionData = await $fetch(`/api/question/${props.id ?? ""}`, {
      method: props.id ? "put" : "post",
      body: {
        ...question,
      },
    })
    props.id ? emit("changed", questionData) : emit("changed", questionData)
    dialog.value = true
    question.value = ""
    explanation.value = ""
    choices.value = []
  } catch (e) {}
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
