import { defineStore } from "pinia"
import { Course } from "~~/types"
import { courses } from "@prisma/client"

export default defineStore("course-store", () => {
  const isCreated = ref(false)
  const isError = ref(false)

  const courses = ref<courses[]>([])

  async function fetchMyCourses() {
    const user = useUser()
    const allCourses = await $fetch("/api/mycourses/all", {
      method: "get",
      query: { userId: user.value?.uid },
    })

    courses.value = allCourses
  }

  async function createCourse(course: Course) {
    try {
      const user = useUser()

      if (user.value?.uid != undefined) {
        course.creatorId = user.value.uid
      }

      await $fetch("/api/mycourses", {
        method: "post",
        body: {
          course: course,
        },
      })
      isCreated.value = true
      fetchMyCourses()
    } catch (e) {
      isError.value = true
    }
  }

  return { isCreated, isError, courses, fetchMyCourses, createCourse }
})
