<script setup>
const props = defineProps(["topicId", "topicPosition"])

const emit = defineEmits(["close", "submit"])

const titleRules = [
  (value) => {
    if (value) return true

    return "You must enter a title"
  },
  (value) => {
    if (value.length > 5) return true

    return "Title must be 5 characters or more"
  },
]

const loading = ref(false)
const valid = ref(false)

const title = ref("")

const submitQuiz = async () => {
  if (valid.value === true) {
    loading.value = true
    try {
      const quiz = await $fetch("/api/quiz", {
        method: "post",
        body: {
          title: title.value,
          topicId: props.topicId,
          topicPosition: props.topicPosition,
        },
      })
      loading.value = false
      emit("close")
      emit("submit", true)
    } catch (e) {}
    emit("submit", false)
  }
}
</script>

<template>
  <v-card width="40%">
    <v-form v-model="valid">
      <v-row>
        <v-col>
          <v-card-title class="text-h5"> Create A New Quiz </v-card-title>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn
            icon="mdi-close"
            variant="flat"
            @click="emit('close')"
          ></v-btn>
        </v-col>
      </v-row>
      <v-card-text>
        <v-text-field
          v-model="title"
          variant="outlined"
          label="Title"
          :rules="titleRules"
        ></v-text-field>
      </v-card-text>

      <v-card class="d-flex justify-end bg-grey-lighten-3 pa-2">
        <v-btn
          class="text-capitalize"
          variant="text"
          @click="emit('close')"
        >
          Cancel
        </v-btn>
        <v-btn
          class="text-capitalize bg-primary"
          type="submit"
          :loading="loading"
          @click="submitQuiz"
        >
          Create Quiz
        </v-btn>
      </v-card>
    </v-form>
  </v-card>
</template>
