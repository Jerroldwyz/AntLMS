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

  // TODO: add type
  const allCourses = await $fetch("/api/mycourses", {
    method: "get",
    query: { userId: userStore.user?.uid },
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
  const enrollments = await $fetch(`/api/users/${userUid}/enrollments`, {
    method: "GET",
  })
  if (enrollments !== null) {
    const courseIds = enrollments.map((enrollment) => enrollment.id)
    const userIsEnrolled = courseIds.includes(courseId)
    return userIsEnrolled
  } else {
    return false
  }
}

export async function getCourseProgress(userUid: string, courseId: number) {
  const enrollments = await $fetch(`/api/users/${userUid}/enrollments`, {
    method: "GET",
  })
  // console.log()
  if (enrollments !== null) {
    const courses = enrollments.filter(
      (enrollment) => enrollment.id === courseId,
    )
    if (courses.length > 0) {
      const course = courses[0].course
      const contentAndQuizIds = []
      course.topics.forEach((topic: any) => {
        topic.content.forEach((content: content) => {
          contentAndQuizIds.push(content.id)
        })
        topic.quizzes.forEach((quiz: quizzes) => {
          contentAndQuizIds.push(quiz.id)
        })
      })
      const completedContentAndQuizIds = []
      courses[0].quiz_progress.forEach((quiz_progresses: any) => {
        quiz_progresses.forEach((lProgress: any) => {
          completedContentAndQuizIds.push(lProgress.id)
        })
      })
      courses[0].progress.forEach((progresses: any) => {
        progresses.forEach((lProgress: any) => {
          completedContentAndQuizIds.push(lProgress.id)
        })
      })
      return (
        (contentAndQuizIds.length / completedContentAndQuizIds.length) * 100
      )
    }
  } else {
    return 0
  }
}
