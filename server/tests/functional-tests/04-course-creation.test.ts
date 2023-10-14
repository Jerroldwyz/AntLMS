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

  it("User can create course and content", async () => {
    const createCourse = await $fetch("/api/mycourses", {
      method: "POST",
      body: {
        title: "1",
        enabled: true,
        thumbnail: null,
        creatorId: testUser.uid,
      },
    })
    const createTopic = await $fetch("/api/topics", {
      method: "POST",
      body: {
        courseId: createCourse.id,
        title: "1",
        position: 1,
      },
    })
    const createContent = await $fetch("/api/content", {
      method: "POST",
      body: {
        title: "1",
        type: "TEXT",
        content: "1",
        topicId: createTopic.id,
        topicPosition: 1,
      },
    })
    const createQuiz = await $fetch("/api/quiz", {
      method: "POST",
      body: {
        topic_id: createTopic.id,
        title: "1",
        topic_position: 1,
        threshold: 1,
      },
    })
    const deleteCourse = await $fetch(`/api/mycourses/${createCourse.id}`, {
      method: "DELETE",
    })
  })
})
