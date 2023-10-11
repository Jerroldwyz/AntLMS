import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { setup, $fetch } from "@nuxt/test-utils"

await setup({
  server: true,
})

let testUser: any
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
  })

  afterAll(async () => {
    try {
      await $fetch(`/api/users/${testUser.uid}`, {
        method: "DELETE",
      })
    } catch (e) {}
  })

  it("Can perform CRUD on courses", async () => {
    const createCourse = await $fetch("/api/mycourses", {
      method: "POST",
      body: {
        title: "1",
        enabled: true,
        thumbnail: null,
        creatorId: testUser.uid,
      },
    })
    const getCourse = await $fetch(`/api/mycourses/${createCourse.id}`)
    expect(getCourse).toEqual({
      id: createCourse.id,
      title: "1",
      enabled: true,
      thumbnail: "",
      creator: testUser.name,
      topics: [],
      tags: [],
    })
    const updateCourse = await $fetch(`/api/mycourses/${createCourse.id}`, {
      method: "PUT",
      body: {
        title: "2",
        enabled: false,
      },
    })
    const getCourseAgain = await $fetch(`/api/mycourses/${updateCourse.id}`)
    expect(getCourseAgain).toEqual({
      id: createCourse.id,
      title: "2",
      enabled: false,
      thumbnail: "",
      creator: testUser.name,
      topics: [],
      tags: [],
    })
    const deleteCourse = await $fetch(`/api/mycourses/${createCourse.id}`, {
      method: "DELETE",
    })
  })
})
