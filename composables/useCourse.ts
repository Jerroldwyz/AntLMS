import { Course } from "~~/types"

export default function useCourses() {
  // TODO: change any to proper type
  async function fetchAllUserCourses(): Promise<any> {
    try {
      const user = useUser()

      // TODO: add type
      const allCourses = ref<any>([])
      allCourses.value = await $fetch("/api/mycourses/all", {
        method: "get",
        query: { userId: user.value?.uid },
      })

      return Promise.resolve(allCourses)
    } catch (e) {
      return Promise.reject("Error fetching all courses!")
    }
  }

  // TODO: change any to proper type
  async function fetchUserCourse(courseId: string | string[]): Promise<any> {
    try {
      // TODO: add type
      const course = ref<any>({})

      course.value = await $fetch("/api/mycourses", {
        method: "get",
        query: { courseId },
      })

      return Promise.resolve(course)
    } catch (e) {
      return Promise.reject("Error fetching course!")
    }
  }

  async function createCourse(course: Course): Promise<any> {
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
    } catch (e) {
      return Promise.reject("Error creating course!")
    }
  }

  return {
    fetchUserCourse,
    fetchAllUserCourses,
    createCourse,
  }
}
