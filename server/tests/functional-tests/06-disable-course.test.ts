import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { setup, $fetch } from "@nuxt/test-utils"

await setup({
  server: true,
})

describe("My test", () => {
  let testUser: any, testCourse: any
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

  it("Course can be disabled and enabled", async () => {
    const disabledCourse = await $fetch(`/api/mycourses/${testCourse.id}`, {
      method: "PUT",
      body: {
        enabled: false,
      },
    })
    const getCourse = await $fetch(`/api/mycourses/${disabledCourse.id}`)
    expect(getCourse).toEqual({
      id: testCourse.id,
      title: "1",
      enabled: false,
      thumbnail: "",
      creator: testUser.name,
      topics: [],
      tags: [],
    })
    const enabledCourse = await $fetch(`/api/mycourses/${disabledCourse.id}`, {
      method: "PUT",
      body: {
        enabled: true,
      },
    })
    const getCourseAgain = await $fetch(`/api/mycourses/${enabledCourse.id}`)
    expect(getCourseAgain).toEqual({
      id: testCourse.id,
      title: "2",
      enabled: true,
      thumbnail: "",
      creator: testUser.name,
      topics: [],
      tags: [],
    })
  })
})
