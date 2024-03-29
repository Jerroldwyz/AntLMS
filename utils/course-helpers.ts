import { useUserStore } from "~/stores/useUserStore"
import { Course } from "~~/types"

export async function fetchAllCourses() {
  // TODO: add type
  const { data } = await useFetch("/api/courses/", {
    method: "get",
  })

  return data
}

export async function fetchSearchQuery(searchQuery: string) {
  const allCourses = await $fetch("/api/courses", {
    method: "get",
    query: { searchQuery },
  })

  return allCourses
}

// TODO: change any to proper type
export async function fetchAllUserCreatedCourses(): Promise<any> {
  const { $firebaseAuth } = useNuxtApp()

  if ($firebaseAuth.currentUser) {
    // TODO: add type
    const allCourses = await $fetch("/api/mycourses", {
      method: "get",
      query: { userId: $firebaseAuth.currentUser.uid },
    })

    return allCourses
  } else {
    return null
  }
}

export async function fetchAllEnrolledCourses(): Promise<any> {
  const { $firebaseAuth } = useNuxtApp()
  if ($firebaseAuth.currentUser) {
    const allEnrollments = await $fetch(
      `/api/users/${$firebaseAuth.currentUser.uid}/enrollments`,
      {
        method: "GET",
      },
    )
    if (allEnrollments)
      return allEnrollments.map((enrollment) => enrollment.course)
    else return null
  } else {
    return null
  }
}

export async function fetchEnrolledCourse(courseId: string | string[]) {
  const { $firebaseAuth } = useNuxtApp()
  if ($firebaseAuth.currentUser) {
    return await $fetch(
      `/api/users/${$firebaseAuth.currentUser.uid}/enrollments/${courseId}`,
      {
        method: "GET",
      },
    )
  } else {
    return null
  }
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

  await $fetch("/api/mycourses", {
    method: "POST",
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

export async function enrollUser(
  userUid: string,
  courseId: number,
): Promise<any> {
  return await $fetch(`/api/users/${userUid}/enrollments`, {
    method: "POST",
    body: {
      courseId,
    },
  })
}

export async function unenrollUser(
  userUid: string,
  courseId: number,
): Promise<any> {
  return await $fetch(`/api/users/${userUid}/enrollments`, {
    method: "DELETE",
    body: {
      courseId,
    },
  })
}

export async function getCourseProgress(userUid: string, courseId: number) {
  return await $fetch(`/api/users/${userUid}/progress`, {
    method: "GET",
    query: {
      courseId,
    },
  })
}
