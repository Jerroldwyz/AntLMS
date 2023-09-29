<script setup>
const props = defineProps({
  id: Number,
  text: String,
  explanation: String,
  choices: Array,
  answer: Number,
})

const emit = defineEmits(["update:answer"])
</script>

<template>
  <v-card class="quiz-box">
    <v-card-title class="quiz-box-title">{{ props.text }}</v-card-title>
    <v-card-text>{{ props.explanation }}</v-card-text>
    <v-card-text class="quiz-box-body">
      <v-list>
        <v-radio-group @update:model-value="emit('update:answer', $event)">
          <v-radio
            v-for="choice in props.choices"
            :key="choice.id"
            class="quiz-box-radio"
            :label="choice.choiceText"
            :value="choice.id"
          ></v-radio>
        </v-radio-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.quiz-box {
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 1px solid black;
  border-radius: 4px;
  margin: 16px;
}

.quiz-box-title {
  background-color: lightblue;
  color: white;
  padding: 8px;
  border-radius: 4px 4px 0 0;
}

.v-card-text {
  color: black;
  padding: 16px;
}

.quiz-box-radio {
  border-bottom: 1px solid black;
  padding: 2px;
}
</style>
