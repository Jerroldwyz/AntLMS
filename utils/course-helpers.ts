import { Course } from "~~/types"

export async function fetchAllCourses(): Promise<any> {
  // TODO: add type
  const { data } = await useFetch("/api/courses", {
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

  console.log(course)

  await $fetch("/api/mycourses", {
    method: "post",
    body: {
      ...course,
    },
  })
}

export async function deleteCourseById(id: number): Promise<any> {
  // TODO: Is validation needed here? Or in the backend?
  await $fetch(`/api/courses/${id}`, {
    method: "DELETE",
  })
}

export async function disableCourseById(id: number): Promise<any> {
  // TODO: Is validation needed here? Or in the backend?
  await $fetch(`/api/courses/${id}`, {
    method: "PUT",
    body: {
      enabled: false,
    },
  })
}

export async function enableCourseById(id: number): Promise<any> {
  // TODO: Is validation needed here? Or in the backend?
  await $fetch(`/api/courses/${id}`, {
    method: "PUT",
  })
}
