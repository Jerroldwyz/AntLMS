import { defineStore } from "pinia"

export const useQuizStore = defineStore("quiz-result", {
  state: () => ({
    result: [] as any[],
    enrollmentId: null as number | null,
  }),
  actions: {
    setEnrollmentId(enrollment_id: number) {
      this.enrollmentId = enrollment_id
    },
    setResult(result: any[]) {
      this.result = result
    },
    async evaluateQuiz(quizId: string) {
      const userStore = useUserStore()
      const data = await $fetch(`/api/quiz/${quizId}/evaluate`, {
        method: "post",
        body: {
          result: this.result,
          enrollmentId: this.enrollmentId,
          userId: userStore.user?.uid,
        },
      })

      return data
    },
  },
})
