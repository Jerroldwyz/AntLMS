<script setup>
// TODO: change any to real type
const props = defineProps(["quizId"])
const emit = defineEmits(["clicked"])
const quiz = await fetchUserQuiz(props.quizId)
const dialog = ref(false)

const threshold = ref(quiz.value.threshold)
const thresholdAlert = ref(false)
const selectedQuestion = ref(0)

const deleteQuestion = async (id, index) => {
  try {
    await deleteUserQuestion(id)
    quiz.value.questions.splice(index, 1)
  } catch (e) {}
}

const setThreshold = async () => {
  try {
    await $fetch(`/api/quiz/${props.quizId}`, {
      method: "put",
      body: {
        threshold: threshold.value,
      },
    })
    thresholdAlert.value = true
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <v-card class="w-100">
    <v-alert
      v-model="thresholdAlert"
      border="start"
      variant="tonal"
      closable
      close-label="Close Alert"
      color="green"
    >
      Threshold has been set
    </v-alert>
    <v-container>
      <v-row>
        <v-col class="d-flex justify-start align-center">
          <h4 class="text-h4">Quiz</h4>
        </v-col>
        <v-col> </v-col>
        <v-col class="d-flex justify-end align-center">
          <v-btn
            class="mb-2 bg-primary"
            icon="mdi-plus"
            @click="emit('clicked', undefined)"
          ></v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row style="padding: 10%">
        <v-col class="d-flex justify-end align-center">
          <v-text-field
            v-model="threshold"
            label="Threshold"
            type="number"
            variant="underlined"
          />
          <v-btn
            variant="elevated"
            @click="setThreshold"
            >Set</v-btn
          >
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
        v-for="(question, index) in quiz.questions"
        :key="index"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            style="display: flex; align-items: center; width: 100%"
            :color="isHovering ? 'primary' : 'white'"
            v-bind="props"
            :class="{ bold: selectedQuestion === index }"
            @click="
              () => {
                emit('clicked', question.id)
                selectedQuestion = index
              }
            "
          >
            <v-col style="width: 10%">
              <v-icon icon="mdi-help" />
            </v-col>
            <v-col class="d-flex justify-start">
              <div
                v-bind="props"
                v-html="question.questionText"
              ></div>
            </v-col>
            <v-col class="d-flex justify-end"
              ><v-btn
                icon="mdi-delete"
                variant="flat"
                @click="dialog = true"
            /></v-col>
          </v-card>
        </v-hover>
        <v-dialog
          v-model="dialog"
          persistent
          width="auto"
        >
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to delete this quiz?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green-darken-1"
                variant="text"
                @click="dialog = false"
              >
                No
              </v-btn>
              <v-btn
                color="red-darken-1"
                variant="elevated"
                @click="
                  () => {
                    deleteQuestion(question.id, index)
                    dialog = false
                  }
                "
              >
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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

.bold {
  font-weight: bold;
}
</style>
