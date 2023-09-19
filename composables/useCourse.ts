import { Course } from "~~/types"

export default function useCourses() {
  // TODO: change any to proper type
  async function fetchAllUserCourses(): Promise<any> {
    const authStore = useAuthStore()

    // TODO: add type
    const allCourses = ref<any>([])
    allCourses.value = await $fetch("/api/mycourses/all", {
      method: "get",
      query: { userId: authStore.user?.uid },
    })

    return allCourses
  }

  // TODO: change any to proper type
  async function fetchUserCourse(courseId: string | string[]): Promise<any> {
    // TODO: add type
    const course = ref<any>({})

    course.value = await $fetch("/api/mycourses", {
      method: "get",
      query: { courseId },
    })

    return course
  }

  async function createCourse(course: Course): Promise<any> {
    const authStore = useAuthStore()

    if (authStore.user?.uid !== undefined) {
      course.creatorId = authStore.user.uid
    }

    await $fetch("/api/mycourses", {
      method: "post",
      body: {
        ...course,
      },
    })
  }

  return {
    fetchUserCourse,
    fetchAllUserCourses,
    createCourse,
  }
}
