import { defineStore } from "pinia"

export const useEnrollmentStore = defineStore("enrollment", {
  state: () => ({
    courses: [],
  }),
  actions: {
    async enrollCourse(uid: string, courseId: number) {
      const data = await enrollUser(uid, courseId)
    },
    async getAllCourses() {
      const courses = await fetchAllEnrolledCourses()
      this.courses = courses
    },
  },
})
