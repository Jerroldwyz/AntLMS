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

  afterAll(async () => {
    try {
      await $fetch(`/api/users/${testUser.uid}`, {
        method: "DELETE",
      })
    } catch (e) {}
    try {
      await $fetch(`/api/mycourses/${testCourse.id}`, {
        method: "DELETE",
      })
    } catch (e) {}
  })

  it("Can perform CRUD on topics", async () => {
    const createTopic = await $fetch("/api/topics", {
      method: "POST",
      body: {
        courseId: testCourse.id,
        title: "1",
        position: 1,
      },
    })
    const getTopic = await $fetch(`/api/topics/${createTopic.id}`)
    expect(getTopic).toEqual({
      id: createTopic.id,
      courseId: testCourse.id,
      title: "1",
      content: [],
      position: 1,
    })
    const updateTopic = await $fetch(`/api/topics/${createTopic.id}`, {
      method: "PUT",
      body: {
        title: "2",
        position: 2,
      },
    })
    const getTopicAgain = await $fetch(`/api/topics/${updateTopic.id}`)
    expect(getTopicAgain).toEqual({
      id: createTopic.id,
      courseId: testCourse.id,
      title: "2",
      content: [],
      position: 2,
    })
    const deleteTopic = await $fetch(`/api/topics/${updateTopic.id}`, {
      method: "DELETE",
    })
  })
})
