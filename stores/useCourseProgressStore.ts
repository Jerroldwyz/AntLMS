import { defineStore } from "pinia"

interface Progress {
  id: number
  enrollment_id: number
  content_id: number
  user_id: string
}

interface QuizProgress {
  id: number
  enrollment_id: number
  quiz_id: number
  user_id: string
}

export const useCourseProgressStore = defineStore("course-progress", {
  state: () => ({
    enrollmentId: null as number | null,
    progress: [] as Progress[],
    quizProgress: [] as QuizProgress[],
  }),
  actions: {
    async updateContentProgress(courseId: string | string[]) {
      this.progress = (await fetchEnrolledCourse(courseId)).progress
    },
    async updateQuizProgress(courseId: string | string[]) {
      this.quizProgress = (await fetchEnrolledCourse(courseId)).quiz_progress
    },
  },
})
