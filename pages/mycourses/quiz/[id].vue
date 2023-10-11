<script setup>
const route = useRoute()
const quizChange = ref(false)

const id = ref(undefined)
const handleClick = (questionId) => {
  id.value = questionId
}

const handleChange = () => {
  quizChange.value = !quizChange.value
}
</script>
<template>
  <v-container fluid>
    <v-container
      class="d-flex"
      style="gap: 2em"
      fluid
    >
      <FormQuestion
        :id="id"
        :key="id"
        :quiz-id="parseInt(route.params.id)"
        @changed="handleChange"
      />
      <QuizList
        :key="quizChange"
        :quiz-id="parseInt(route.params.id)"
        @clicked="handleClick"
      />
    </v-container>
    <v-container
      class="d-flex align-end"
      fluid
    >
      <v-card class="d-flex justify-end bg-grey-lighten-3 w-100 pa-2">
        <v-btn
          class="text-capitalize"
          variant="text"
          @click="navigateTo('/mycourses')"
        >
          Cancel
        </v-btn>
      </v-card>
    </v-container>
  </v-container>
</template>
