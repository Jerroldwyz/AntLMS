<script setup>
// TODO: change any to real type
const props = defineProps(["quiz"])
const emit = defineEmits(["clicked"])
const quiz = ref(props.quiz)

const deleteQuestion = async (id, index) => {
  try {
    await deleteUserQuestion(id)
    quiz.value.questions.splice(index, 1)
  } catch (e) {}
}
</script>

<template>
  <v-card class="w-100">
    <v-container>
      <v-row>
        <v-col class="d-flex justify-start align-center">
          <h4 class="text-h4">Quiz</h4>
        </v-col>
        <v-col class="d-flex justify-end align-center">
          <v-btn
            class="mb-2 bg-primary"
            icon="mdi-plus"
            @click="emit('clicked', undefined)"
          ></v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
        v-for="(question, index) in quiz.questions"
        :key="index"
      >
        <v-col
          class="d-flex justify-start align-center"
          @click="emit('clicked', question.id)"
        >
          <v-icon icon="mdi-help" />
          {{ question.questionText }}
        </v-col>
        <v-col class="d-flex justify-end align-center">
          <v-btn
            icon="mdi-delete"
            variant="flat"
            @click="deleteQuestion(question.id, index)"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<style>
.list-item {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.list-item .v-list-item-content {
  flex-grow: 1;
}

.list-item .v-list-item-action {
  margin-left: 10px;
}
</style>
