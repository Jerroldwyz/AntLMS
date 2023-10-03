import { content, quizzes, topics, progress } from "@prisma/client"
import { useUserStore } from "~/stores/useUserStore"
import { Course } from "~~/types"

export async function fetchAllCourses() {
  // TODO: add type
  const { data } = await useFetch("/api/courses/", {
    method: "get",
  })

  return data
}

// TODO: change any to proper type
export async function fetchAllUserCourses(): Promise<any> {
  const userStore = useUserStore()
  const userUid = userStore.user?.uid

  if (userUid) {
    const allEnrollments = await $fetch(`/api/users/${userUid}/enrollments`, {
      method: "get",
    })

    return allEnrollments.map((enrollment) => enrollment.course)
  }
  // TODO: Throw error?
  return "ERROR: Not logged in"
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
  const userStore = useUserStore()

  if (userStore.user?.uid !== undefined) {
    course.creatorId = userStore.user.uid
  }

  console.log(course)

  await $fetch("/api/mycourses", {
    method: "post",
    body: {
      ...course,
    },
  })
}

export async function updateCourse(
  course: Course,
  id: string | string[],
): Promise<any> {
  const userStore = useUserStore()

  if (userStore.user?.uid !== undefined) {
    course.creatorId = userStore.user.uid
  }

  await $fetch(`/api/mycourses/${id}`, {
    method: "PUT",
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
    body: {
      enabled: true,
    },
  })
}

export async function isEnrolled(userUid: string, courseId: number) {
  const enrollments = await $fetch(`/api/users/${userUid}/enrollments/`, {
    method: "GET",
  })
  if (enrollments !== null) {
    const courseIds = enrollments.map((enrollment) => enrollment.course.id)
    const userIsEnrolled = courseIds.includes(courseId)
    return userIsEnrolled
  } else {
    return false
  }
}

export async function getCourseProgress(userUid: string, courseId: number) {
  return await $fetch(`/api/users/${userUid}/progress`, {
    method: "GET",
    query: {
      courseId,
    },
  })
}
