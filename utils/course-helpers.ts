import { Course } from "~~/types"

// TODO: change any to proper type
export async function fetchAllUserCourses(): Promise<any> {
  const user = useUser()

  // TODO: add type
  const allCourses = ref<any>([])
  allCourses.value = await $fetch("/api/mycourses/all", {
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
  const course = ref<any>({})

  course.value = await $fetch("/api/mycourses", {
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
