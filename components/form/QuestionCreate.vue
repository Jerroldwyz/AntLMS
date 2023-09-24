<!-- <script setup>

const choices = ref([]);

const addRadio = () => {
    choices.value.push('other')
}
</script>

<template>
    <v-card width="90%">
        <form>
            <v-card-title class="text-h5"> Create Quiz </v-card-title>
            <v-text-field label="question text" />
            <v-text-field label="explanation" />
            <v-card-title class="text-h9"> Choices </v-card-title>
            <v-radio-group v-model="radioValue">
                <v-radio v-for="(choice, index) in choices.value" :key="index" :value="choice">
                    <template v-slot:label>
                        <v-text-field type="text" label="Choice Text"></v-text-field>
                    </template>
                </v-radio>
            </v-radio-group>
            <v-btn @click="addRadio">+</v-btn>
        </form>
    </v-card>
</template> -->

<template>
  <v-card width="90%">
    <form>
      <v-card-title class="text-h5"> Create Quiz </v-card-title>
      <v-text-field
        v-model="questionText"
        label="question text"
      />
      <v-text-field
        v-model="explanation"
        label="explanation"
      />
      <v-card-title class="text-h9"> Choices </v-card-title>
      <v-radio-group v-model="correctAns">
        <v-radio
          v-for="(choice, index) in choices"
          :key="index"
          :value="index"
        >
          <template #label>
            <v-text-field
              v-model="choice.choiceText"
              type="text"
              label="Choice Text"
            ></v-text-field>
          </template>
        </v-radio>
      </v-radio-group>
      <v-btn @click="addChoice">+</v-btn>
      <v-btn @click="handleSubmit">Add Question</v-btn>
    </form>
  </v-card>
</template>

<script setup>
const choices = ref([])
const correctAns = ref(0)
const questionText = ref("")
const explanation = ref("")

const addChoice = () => {
  if (choices.value.length < 4) {
    choices.value.push({
      choiceText: "",
      isCorrect: false,
    })
  }
}

const handleSubmit = () => {
  choices.value[correctAns.value].isCorrect = true
  const question = {
    questionText: questionText.value,
    explanation: explanation.value,
    choices: choices.value,
  }
  console.log(question)
}
</script>
