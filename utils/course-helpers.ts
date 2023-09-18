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
  const user = useUser()

  // TODO: add type
  const allCourses = await $fetch("/api/mycourses/all", {
    method: "get",
    query: { userId: user.value?.uid },
  })

  return allCourses
}

// TODO: change any to proper type
export async function fetchUserCourse(
  courseId: string | string[],
): Promise<any> {
  // TODO: add type
  const course = await $fetch("/api/mycourses", {
    method: "get",
    query: { courseId },
  })

  return course
}

export async function createCourse(course: Course): Promise<any> {
  const user = useUser()

  if (user.value?.uid !== undefined) {
    course.creatorId = user.value.uid
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
  await $fetch(`/api/courses/${id}/delete`, {
    method: "DELETE",
  })
}
