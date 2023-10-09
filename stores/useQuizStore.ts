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
  },
})
