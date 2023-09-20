import { Course } from "~~/types"

export async function fetchAllCourses() {
  // TODO: add type
  // const authStore = useAuthStore()
  // const uid = authStore.user.uid;
  const uid = "9d93ed2d-f55e-47ba-b4f5-75b563152a43	"
  const { data } = await useFetch("/api/courses/", {
    method: "get",
  })

  return data
}

// TODO: change any to proper type
export async function fetchAllUserCourses(): Promise<any> {
  const authStore = useAuthStore()

  // TODO: add type
  const allCourses = await $fetch("/api/mycourses", {
    method: "get",
    query: { userId: authStore.user?.uid },
  })

  return allCourses
}

// TODO: change any to proper type
export async function fetchUserCourse(
  courseId: string | string[],
): Promise<any> {
  // TODO: add type
  const course = await $fetch(`/api/mycourses/${courseId}`, {
    method: "get",
  })

  return course
}

export async function createCourse(course: Course): Promise<any> {
  const authStore = useAuthStore()

  if (authStore.user?.uid !== undefined) {
    course.creatorId = authStore.user.uid
  }

  await $fetch("/api/mycourses", {
    method: "post",
    body: {
      course,
    },
  })
}

export async function deleteCourse(id: number): Promise<any> {
  // TODO: Is validation needed here? Or in the backend?
  await $fetch(`/api/courses/${id}`, {
    method: "DELETE",
  })
}