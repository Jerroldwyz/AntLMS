import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { setup, $fetch } from "@nuxt/test-utils"

await setup({
  server: true,
})

let testUser: any, testCourse: any
describe("My test", () => {
  beforeAll(async () => {
    testUser = await $fetch("/api/users", {
      method: "POST",
      body: {
        name: "test",
        email: "test@example.com",
        thumbnail: null,
        contactDetails: {},
        isAdmin: false,
        enabled: true,
      },
    })
    testCourse = await $fetch("/api/mycourses", {
      method: "POST",
      body: {
        title: "1",
        enabled: true,
        thumbnail: null,
        creatorId: testUser.uid,
      },
    })
  })

  // Cleanup is not possible as the server shuts down automatically right before this step...
  afterAll(async () => {
    try {
      if (testUser) {
        await $fetch(`/api/users/${testUser.uid}`, {
          method: "DELETE",
        })
      }
      if (testCourse) {
        await $fetch(`/api/mycourses/${testCourse.id}`, {
          method: "DELETE",
        })
      }
    } catch (e) {}
  })

  it("Can enrol a user into a course", async () => {
    const enrolIntoCourse = await $fetch(
      `/api/users/${testUser.uid}/enrollments`,
      {
        method: "POST",
        body: {
          courseId: testCourse.id,
        },
      },
    )
    const getEnrollments = await $fetch(
      `/api/users/${testUser.uid}/enrollments`,
    )
    expect(getEnrollments).toEqual([
      {
        id: enrolIntoCourse.id,
        course: {
          id: testCourse.id,
          title: "1",
          thumbnail: null,
          creator: { name: testUser.name },
        },
        progress: [],
        quiz_progress: [],
      },
    ])
    const deleteEnrollment = await $fetch(
      `/api/users/${testUser.uid}/enrollments`,
      {
        method: "DELETE",
        body: {
          courseId: testCourse.id,
        },
      },
    )
    const getEnrollmentsAgain = await $fetch(
      `/api/users/${testUser.uid}/enrollments`,
    )
    expect(getEnrollmentsAgain).toEqual([])
  })
})
