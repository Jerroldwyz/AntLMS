<template>
  <div>
    <v-progress-linear
      v-if="isLoading"
      color="primary"
      indeterminate
      :height="12"
    ></v-progress-linear>
    <div
      v-else
      class="d-flex flex-column justify-center"
    >
      <div class="text-h2 mb-6">{{ quiz?.title }}</div>
      <v-divider
        :thickness="7"
        class="border-opacity-100"
      ></v-divider>

      <QuizQuestionBox
        v-for="(question, index) in quiz?.questions"
        :id="question.id"
        :key="index"
        v-model:answer="answers[question.id]"
        :key-index="index"
        :text="question.questionText"
        :explanation="question.explanation"
        :choices="question.choices"
      />

      <v-btn
        class="mx-auto"
        color="primary"
        :disabled="!isValid"
        variant="flat"
        @click="handleSubmit"
      >
        <span v-if="isValid">Submit Quiz</span>
        <span v-else>Please answer all questions</span>
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["id", "enrollmentId", "userId"])

interface Choice {
  id: number
  choiceText: string
  isCorrect: boolean
}

interface Question {
  id: number
  questionText: string
  explanation: string
  choices: Choice[]
}

interface Quiz {
  title: string
  topicId: number
  threshold: number
  questions: Question[]
}

const quiz = ref<Quiz | null>(null)

const fetchData = async () => {
  const { data } = await useFetch<Quiz>(`/api/quiz/${props.id}`, {
    method: "GET",
  })

  return data.value
}

onMounted(async () => {
  isLoading.value = true
  try {
    const data = await fetchData()
    if (data) {
      quiz.value = data
    }
  } finally {
    isLoading.value = false
  }
})

const isLoading = ref(true)
const answers = ref<{ [key: number]: any }>({})

const isValid = computed(() => {
  const choices = quiz.value?.questions.map((question) => {
    return answers.value[question.id]
  })

  for (const choice in choices) {
    if (!choices[choice as unknown as number]) {
      return false
    }
  }

  return true
})

const handleSubmit = () => {
  const router = useRouter()
  const route = useRoute()
  const choices =
    quiz.value?.questions.map((question) => {
      return answers.value[question.id]
    }) || []

  const quizStore = useQuizStore()
  quizStore.setResult(choices)
  router.push({
    path: `${route.fullPath}/result`,
  })
}
</script>
<style scoped></style>
